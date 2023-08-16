import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()



async function main() {
  await prisma.singleEventPhoto.deleteMany({})
  await prisma.singleEvent.deleteMany({})

  await prisma.singleOfferPhoto.deleteMany({})
  await prisma.singleOffer.deleteMany({})

  await prisma.multipleEventPhoto.deleteMany({})
  await prisma.multipleEvent.deleteMany({})

  await prisma.multipleOfferPhoto.deleteMany({})
  await prisma.multipleOffer.deleteMany({})

  await prisma.venuePhoto.deleteMany({})
  await prisma.venue.deleteMany({})

}











main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
