import db from "../models/index.js";

const { sequelize, Hotel, Room, Booking, City } = db;

const cities = [
  {
    city: "Mumbai",
    areas: ["Marine Drive", "Bandra", "Colaba", "Juhu"],
    vibe: "sea-facing business and leisure stay",
    basePrice: 6200,
  },
  {
    city: "Jaipur",
    areas: ["Amer Road", "C Scheme", "Bani Park", "MI Road"],
    vibe: "heritage-inspired stay near forts and markets",
    basePrice: 4300,
  },
  {
    city: "Kochi",
    areas: ["Fort Kochi", "Marine Drive", "Vyttila", "Kakkanad"],
    vibe: "waterfront stay for backwater trips and slow weekends",
    basePrice: 5200,
  },
  {
    city: "Manali",
    areas: ["Old Manali", "Hadimba Road", "Mall Road", "Prini"],
    vibe: "mountain lodge with valley views and trail access",
    basePrice: 3600,
  },
  {
    city: "Goa",
    areas: ["Calangute", "Baga", "Candolim", "Palolem"],
    vibe: "beach stay close to cafes, nightlife, and water sports",
    basePrice: 4800,
  },
  {
    city: "Bengaluru",
    areas: ["Indiranagar", "Whitefield", "Koramangala", "MG Road"],
    vibe: "modern city hotel for work trips and weekend plans",
    basePrice: 5000,
  },
];

const amenitiesPool = [
  "Free Wifi",
  "Swimming Pool",
  "Parking",
  "Breakfast Included",
  "Gym",
  "Spa",
  "Air Conditioning",
  "Restaurant",
  "Room Service",
  "Airport Shuttle",
  "Pet Friendly",
  "Beach Access",
  "Mountain View",
  "Bar",
  "Work Desk",
];

const roomAmenitiesPool = [
  "1 Queen Bed",
  "1 King Bed",
  "2 Queen Beds",
  "City View",
  "Sea View",
  "Balcony",
  "Private Bathroom",
  "Bathtub",
  "Rain Shower",
  "Mini Bar",
  "Coffee Machine",
  "Electric Kettle",
  "Smart TV",
  "Wardrobe",
  "Work Desk",
  "Seating Area",
  "Sofa",
  "Dining Area",
  "Room Safe",
  "Hair Dryer",
  "Iron",
  "Free Toiletries",
  "Bathrobes",
  "Slippers",
  "Blackout Curtains",
  "Interconnected Room",
];

const hotelPrefixes = [
  "Grand",
  "Royal",
  "Urban",
  "Heritage",
  "Regal",
  "Vista",
  "Elite",
  "Palm",
  "Lakeview",
  "Cedar",
  "Saffron",
  "Sterling",
];

const hotelSuffixes = [
  "Retreat",
  "Grand",
  "Suites",
  "Residency",
  "Resort",
  "Palace",
  "Inn",
  "House",
  "Stay",
  "Lodge",
  "Courtyard",
  "Haven",
];

const hotelImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
  "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
  "https://images.unsplash.com/photo-1455587734955-081b22074882",
  "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a",
  "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd",
  "https://images.unsplash.com/photo-1505692952047-1a78307da8f2",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
  "https://images.unsplash.com/photo-1559599238-308793637427",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
];

const roomImages = [
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
  "https://images.unsplash.com/photo-1598928636135-d146006ff4be",
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  "https://images.unsplash.com/photo-1590490359683-658d3d23f972",
  "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf",
  "https://images.unsplash.com/photo-1591088398332-8a7791972843",
  "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
  "https://images.unsplash.com/photo-1494526585095-c41746248156",
];

const roomTypes = [
  {
    type: "Standard Queen Room",
    multiplier: 1,
    rooms: 24,
    sizeSqft: 320,
    maxGuests: 2,
    bedType: "1 Queen Bed",
    viewType: "City View",
  },
  {
    type: "Deluxe King Room",
    multiplier: 1.35,
    rooms: 18,
    sizeSqft: 380,
    maxGuests: 2,
    bedType: "1 King Bed",
    viewType: "City View",
  },
  {
    type: "Premium View Room",
    multiplier: 1.6,
    rooms: 14,
    sizeSqft: 440,
    maxGuests: 3,
    bedType: "1 King Bed",
    viewType: "Sea View",
  },
  {
    type: "Executive Suite",
    multiplier: 2.2,
    rooms: 8,
    sizeSqft: 520,
    maxGuests: 3,
    bedType: "1 King Bed",
    viewType: "Ocean View",
  },
  {
    type: "Family Suite",
    multiplier: 2.45,
    rooms: 6,
    sizeSqft: 620,
    maxGuests: 4,
    bedType: "2 Queen Beds",
    viewType: "Sea View",
  },
];

const pick = (items, index) => items[index % items.length];

const randomItem = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomHotelAmenities = (index) => {
  const count = 4 + (index % 4);

  return Array.from(
    new Set(
      Array.from({ length: count }, (_, i) =>
        pick(amenitiesPool, index + i * 2),
      ),
    ),
  );
};

const getRandomRoomAmenities = (index) => {
  const count = 5 + (index % 4);

  return Array.from(
    new Set(
      Array.from({ length: count }, (_, i) =>
        pick(roomAmenitiesPool, index + i * 3),
      ),
    ),
  );
};

const buildRoomImages = () => {
  const shuffled = [...roomImages].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, 3);
};

const buildHotels = (createdCities) => {
  const hotels = [];

  cities.forEach((cityData, cityIndex) => {
    for (let i = 0; i < 20; i++) {
      const index = cityIndex * 20 + i;

      const area = pick(cityData.areas, i);

      const prefix = pick(hotelPrefixes, index);

      const suffix = pick(hotelSuffixes, index + 3);

      const rating = Number((3.8 + (index % 12) * 0.1).toFixed(1));

      const roomStart = index % roomTypes.length;

      hotels.push({
        name: `${prefix} ${area} ${suffix}`,

        image: randomItem(hotelImages),

        cityId: createdCities[cityIndex].id,

        address: `${12 + i}, ${area}, ${cityData.city}`,

        description: `A ${cityData.vibe}, with reliable rooms, friendly service, and easy access to local attractions.`,

        rating,

        amenities: getRandomHotelAmenities(index),

        rooms: [0, 1, 2].map((offset) => {
          const room = pick(roomTypes, roomStart + offset);

          return {
            type: room.type,

            pricePerNight: Math.round(
              cityData.basePrice * room.multiplier + (index % 5) * 350,
            ),
            totalRooms: Math.max(4, room.rooms - (index % 4)),
            sizeSqft: room.sizeSqft,
            maxGuests: room.maxGuests,
            bedType: room.bedType,
            viewType: room.viewType,

            images: buildRoomImages(),
            amenities: getRandomRoomAmenities(index + offset),
          };
        }),
      });
    }
  });

  return hotels;
};

const seedHotelsAndRooms = async () => {
  const shouldFreshSeed = process.argv.includes("--fresh");

  await sequelize.authenticate();

  await sequelize.sync({ alter: true });

  if (shouldFreshSeed) {
    await Booking.destroy({ where: {} });

    await Room.destroy({ where: {} });

    await Hotel.destroy({ where: {} });

    await City.destroy({ where: {} });
  }

  const existingHotelsCount = await Hotel.count();

  if (existingHotelsCount > 0 && !shouldFreshSeed) {
    console.log(`Seed skipped: ${existingHotelsCount} hotels already exist.`);

    return;
  }

  const createdCities = await City.bulkCreate(
    cities.map((city) => ({
      name: city.city,
    })),
    { returning: true },
  );

  const hotels = buildHotels(createdCities);

  for (const hotelData of hotels) {
    const { rooms, ...hotelPayload } = hotelData;

    const hotel = await Hotel.create(hotelPayload);

    await Room.bulkCreate(
      rooms.map((room) => ({
        ...room,
        hotelId: hotel.id,
      })),
    );
  }

  console.log(
    `Seed completed: ${hotels.length} hotels and ${
      hotels.length * 3
    } rooms created.`,
  );
};

seedHotelsAndRooms()
  .catch((error) => {
    console.error("Seed failed:", error);
  })
  .finally(async () => {
    await sequelize.close();
  });
