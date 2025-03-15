import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Define interfaces for type safety
interface AccountInput {
  email: string;
  username: string;
  password: string;
}

interface ProfileInput {
  lastname: string;
  middlename: string;
  firstname: string;
  suffix?: string | null;
  bio?: string | null;
  picture?: string | null;
}

interface ModuleInput {
  moduleCode: string;
  moduleDetails: string;
  moduleDesc: string;
}

async function main() {
  try {
    // First account
    // Check if account already exists
    const existingAccount = await prisma.account.findUnique({
      where: { email: "jeremy@example.com" },
      include: { profile: true, modules: true }
    });

    let accountWithProfile;

    if (existingAccount) {
      console.log("Account already exists:", existingAccount);
      accountWithProfile = existingAccount;
    } else {
      // 1. Create Account and Profile Together
      console.log("1. Creating an Account with a Profile...");
      accountWithProfile = await createAccountWithProfile({
        account: {
          email: "jeremy@example.com",
          username: "jeremy123",
          password: "securepassword"
        },
        profile: {
          lastname: "Flores-Marron",
          middlename: "M",
          firstname: "Jeremy",
          bio: "Computer Science Student"
        }
      });
      console.log("Created Account with Profile:", accountWithProfile);
    }

    // Second account - always try to create this one for demonstration
    console.log("\nCreating a second account for demonstration...");
    try {
      const secondAccount = await createAccountWithProfile({
        account: {
          email: "john@example.com",
          username: "johndoe",
          password: "password123"
        },
        profile: {
          lastname: "Doe",
          middlename: "A",
          firstname: "John",
          bio: "Software Engineer"
        }
      });
      console.log("Created second account:", secondAccount);

      // Add a module to the second account
      const secondAccountModule = await addModuleToAccount({
        accountId: secondAccount.id,
        moduleData: {
          moduleCode: "CS303",
          moduleDetails: "Web Development",
          moduleDesc: "Learn to build modern web applications"
        }
      });
      console.log("Added module to second account:", secondAccountModule);
    } catch (error) {
      console.log("Second account already exists or other error occurred:", error.message);
    }

    // 2. Add Modules to an Existing Account (only if no modules exist)
    if (existingAccount?.modules?.length === 0 || !existingAccount) {
      console.log("\n2. Adding Modules to an Existing Account...");
      const newModule = await addModuleToAccount({
        accountId: accountWithProfile.id,
        moduleData: {
          moduleCode: "CS101",
          moduleDetails: "Introduction to Programming",
          moduleDesc: "Fundamentals of programming concepts"
        }
      });
      console.log("Added Module:", newModule);

      // Add another module
      const anotherModule = await addModuleToAccount({
        accountId: accountWithProfile.id,
        moduleData: {
          moduleCode: "CS202",
          moduleDetails: "Advanced Database Systems",
          moduleDesc: "Covers advanced database concepts and implementations"
        }
      });
      console.log("Added another Module:", anotherModule);
    } else {
      console.log("\nModules already exist for this account.");
    }

    // 3. Fetch and display Accounts with their associated Profiles and Modules
    console.log("\n3. Fetching all Accounts with their Profiles and Modules...");
    const accounts = await fetchAccountsWithProfilesAndModules();
    console.log("All Accounts with Profiles and Modules:");
    console.dir(accounts, { depth: null });

  } catch (error) {
    console.error("Error in main function:", error);
  }
}

// Function to create an Account with a Profile simultaneously
async function createAccountWithProfile({ 
  account, 
  profile 
}: { 
  account: AccountInput; 
  profile: ProfileInput;
}) {
  return prisma.account.create({
    data: {
      email: account.email,
      username: account.username,
      password: account.password,
      profile: {
        create: {
          lastname: profile.lastname,
          middlename: profile.middlename,
          firstname: profile.firstname,
          suffix: profile.suffix || null,
          bio: profile.bio || null,
          picture: profile.picture || null,
        },
      },
    },
    include: {
      profile: true,
    },
  });
}

// Function to add a Module to an existing Account
async function addModuleToAccount({ 
  accountId, 
  moduleData 
}: { 
  accountId: number; 
  moduleData: ModuleInput;
}) {
  return prisma.modules.create({
    data: {
      accountCode: accountId,
      moduleCode: moduleData.moduleCode,
      moduleDetails: moduleData.moduleDetails,
      moduleDesc: moduleData.moduleDesc,
    },
  });
}

// Function to fetch all Accounts with their Profiles and Modules
async function fetchAccountsWithProfilesAndModules() {
  return prisma.account.findMany({
    include: {
      profile: true,
      modules: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });