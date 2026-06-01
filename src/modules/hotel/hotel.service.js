import db from "../../models/index.js";
import { amadeus } from "../../config/amadeus.js";
import { Op } from "sequelize";
import sequelize from "../../config/db.js";

const { Hotel, Room, City } = db;

export const getAllHotels = async (filters) => {
  const {
    search,
    minRating,
    minPrice,
    maxPrice,
    amenities,
    page = 1,
    limit = 10,
    sortBy,
  } = filters;

  const currentPage = Number(page) || 1;
  const currentLimit = Number(limit) || 10;

  const whereClause = {};
  const cityWhereClause = {};
  const roomWhereClause = {};

  if (search) {
    cityWhereClause.name = {
      [Op.iLike]: `%${search}%`,
    };
  }

  if (minRating) {
    whereClause.rating = {
      [Op.gte]: Number(minRating),
    };
  }

  if (amenities) {
    whereClause.amenities = {
      [Op.contains]: [].concat(amenities),
    };
  }

  if (minPrice || maxPrice) {
    roomWhereClause.pricePerNight = {
      [Op.between]: [
        Number(minPrice || 0),
        Number(maxPrice || 999999),
      ],
    };
  }

  let order = [["name", "ASC"]];

  if (sortBy === "ratingHighToLow") {
    order = [["rating", "DESC"]];
  }

  // fetch ALL matching hotels first
  const hotels = await Hotel.findAll({
    where: whereClause,
    include: [
      {
        model: City,
        as: "city",
        where: cityWhereClause,
        required: true,
      },
      {
        model: Room,
        as: "rooms",
        where: roomWhereClause,
        required: minPrice || maxPrice ? true : false,
      },
    ],
    order,
  });

  let hotelsData = hotels.map((hotel) => {
    const hotelJson = hotel.toJSON();

    const minPrice = hotel.rooms.length
      ? Math.min(
          ...hotel.rooms.map(
            (room) => room.pricePerNight
          )
        )
      : null;

    return {
      ...hotelJson,
      minPrice,
    };
  });

  // SORT AFTER minPrice exists
  if (sortBy === "priceLowToHigh") {
    hotelsData.sort(
      (a, b) => a.minPrice - b.minPrice
    );
  }

  if (sortBy === "priceHighToLow") {
    hotelsData.sort(
      (a, b) => b.minPrice - a.minPrice
    );
  }

  // paginate AFTER sorting
  const total = hotelsData.length;

  const paginatedHotels = hotelsData.slice(
    (currentPage - 1) * currentLimit,
    currentPage * currentLimit
  );

  const amenitiesResult = await Hotel.findAll({
    attributes: ["amenities"],
    raw: true,
  });

  const uniqueAmenities = [
    ...new Set(
      amenitiesResult.flatMap(
        (hotel) => hotel.amenities || []
      )
    ),
  ];

  return {
    data: paginatedHotels,
    pagination: {
      total,
      page: currentPage,
      limit: currentLimit,
      totalPages: Math.ceil(
        total / currentLimit
      ),
    },
    filters: {
      amenities: uniqueAmenities,
    },
  };
};

export const getHotelById = async (id) => {
  return await Hotel.findByPk(id, {
    include: [
      {
        model: Room,
        as: "rooms",
      },
    ],
  });
};

export const createHotel = async (hotelData) => {
  return await Hotel.create(hotelData);
};

export const updateHotel = async (id, hotelData) => {
  const hotel = await Hotel.findByPk(id);
  if (!hotel) {
    return null;
  }
  await hotel.update(hotelData);
  return hotel;
};

export const deleteHotel = async (id) => {
  const hotel = await Hotel.findByPk(id);
  if (!hotel) {
    return false;
  }
  await hotel.destroy();
  return true;
};

export const searchHotelOffers = async ({ filters }) => {
  const { cityCode, checkInDate, checkOutDate, adults } = filters;

  // STEP 1 — Get hotel list by city
  const hotelsList = await amadeus.referenceData.locations.hotels.byCity.get({
    cityCode,
  });

  const hotelsData = hotelsList?.data ?? [];

  if (!Array.isArray(hotelsData) || hotelsData.length === 0) {
    return [];
  }

  // Take first 5 hotels to avoid API overload
  const hotelIds = hotelsData
    .slice(0, 5)
    .map((hotel) => hotel.hotelId)
    .join(",");
  if (!hotelIds) {
    return [];
  }

  // STEP 2 — Get offers using hotelIds
  const offersResponse = await amadeus.shopping.hotelOffersSearch.get({
    hotelIds,
    checkInDate,
    checkOutDate,
    adults,
  });

  const offersData = offersResponse?.data ?? [];

  if (!Array.isArray(offersData) || offersData.length === 0) {
    return [];
  }

  // STEP 3 — Map to clean structure
  return offersData.map((hotel) => {
    const offer = hotel?.offers?.[0];

    return {
      hotelId: hotel?.hotel?.hotelId ?? null,
      name: hotel?.hotel?.name ?? null,
      rating: hotel?.hotel?.rating ?? null,
      address: hotel?.hotel?.address?.lines?.join(", ") ?? null,
      latitude: hotel?.hotel?.latitude ?? null,
      longitude: hotel?.hotel?.longitude ?? null,

      offerId: offer?.id ?? null,
      price: offer?.price?.total ?? null,
      currency: offer?.price?.currency ?? null,
      roomType: offer?.room?.typeEstimated?.category ?? null,
      cancellationPolicy:
        offer?.policies?.cancellation?.description?.text ?? null,
    };
  });
};
