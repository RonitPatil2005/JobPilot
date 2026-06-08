// const { chromium } = require("playwright");

// const runIndeedAutomation = async (
//   role,
//   location
// ) => {

//   const browser = await chromium.launch({

//     headless: false

//   });

//   const page = await browser.newPage();

//   try {

//     // OPEN INDEED

//     await page.goto(
//       "https://www.indeed.com",
//       {
//         waitUntil: "domcontentloaded"
//       }
//     );

//     // JOB ROLE INPUT

//     await page.fill(
//       'input[name="q"]',
//       role
//     );

//     // LOCATION INPUT

//     await page.fill(
//       'input[name="l"]',
//       location
//     );

//     // SEARCH BUTTON

//     await page.keyboard.press("Enter");

//     // WAIT FOR RESULTS

//     await page.waitForTimeout(5000);

//     console.log(
//       "Jobs searched successfully"
//     );

//     // GET JOB CARDS

//     const jobs = await page.locator(
//       ".job_seen_beacon"
//     );

//     const count = await jobs.count();

//     console.log(
//       `Found ${count} jobs`
//     );

//     // LOOP THROUGH JOBS

//     for(let i=0; i<Math.min(count,5); i++){

//       const job = jobs.nth(i);

//       await job.click();

//       await page.waitForTimeout(3000);

//       console.log(
//         `Opened job ${i+1}`
//       );

//     }

//   } catch (error) {

//     console.log(error);

//   }

// };

// module.exports = runIndeedAutomation;

const { chromium } = require("playwright");

const runIndeedAutomation = async (
  role,
  location
) => {

  const browser = await chromium.launch({

    headless: false,

    slowMo: 200

  });

  const context = await browser.newContext({

    viewport: {
      width: 1400,
      height: 900
    },

    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"

  });

  const page = await context.newPage();

  try {

    // OPEN INDEED

    await page.goto(
      "https://www.indeed.com",
      {
        waitUntil: "domcontentloaded"
      }
    );

    // WAIT LIKE HUMAN

    await page.waitForTimeout(3000);

    // TYPE ROLE SLOWLY

    await page.click(
      'input[name="q"]'
    );

    await page.keyboard.type(
      role,
      { delay: 150 }
    );

    // TYPE LOCATION

    await page.click(
      'input[name="l"]'
    );

    await page.keyboard.press(
      "Control+A"
    );

    await page.keyboard.press(
      "Backspace"
    );

    await page.keyboard.type(
      location,
      { delay: 150 }
    );

    // WAIT

    await page.waitForTimeout(1500);

    // PRESS SEARCH

    await page.keyboard.press(
      "Enter"
    );

    // WAIT FOR RESULTS

    await page.waitForTimeout(6000);

    console.log(
      "Jobs searched successfully"
    );

    // GET JOB CARDS

    const jobs = await page.locator(
      ".job_seen_beacon"
    );

    const count = await jobs.count();

    console.log(
      `Found ${count} jobs`
    );

    // OPEN FIRST 5 JOBS

    for (let i = 0; i < Math.min(count, 5); i++) {

      const job = jobs.nth(i);

      await job.click();

      console.log(
        `Opened job ${i + 1}`
      );

      await page.waitForTimeout(4000);

    }

  } catch (error) {

    console.log(error);

  }

};

module.exports = runIndeedAutomation;