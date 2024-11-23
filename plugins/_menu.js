const fs = require('fs');
const path = require('path');
const os = require('os');
const Config = require('../config');
const { fancytext, tiny, runtime, formatp, prefix } = require("../lib");
const long = String.fromCharCode(0x200e);
const readmore = long.repeat(0xfa1);
const astro_patch = require("../lib/plugins");

// Variable to keep track of the current design index
let currentDesignIndex = 0;

// Function to get the next menu design
function getNextMenuDesign() {
  const designs = [
    {
      header: "🧸❤️✦ ⟪ *{botname}* ⟫ ✦❤️🧸\n",
      lineSeparator: "✦ ",
      commandPrefix: "➔ ",
      footer: "✦✦✦✦✦✦✦✦✦✦",
      emoji: "🧸",
      categorySeparator: "✦✧✦✧✦✧✦\n",
    },
    {
      header: "🧸❤️⬤ ⟪ *{botname}* ⟫ ⬤❤️🧸\n",
      lineSeparator: "⬤ ",
      commandPrefix: "⇒ ",
      footer: "⬤⬤⬤⬤⬤⬤⬤",
      emoji: "🧸",
      categorySeparator: "⬤⬛⬤⬛⬤⬛⬤\n",
    },
    {
      header: "🧸❤️✰ ⟪ *{botname}* ⟫ ✰❤️🧸\n",
      lineSeparator: "✰ ",
      commandPrefix: "✦ ",
      footer: "✰✰✰✰✰✰✰",
      emoji: "🧸",
      categorySeparator: "✰☽✰☽✰☽✰\n",
    }
  ];

  // Get the current design
  const design = designs[currentDesignIndex];
  
  // Update the index for the next design
  currentDesignIndex = (currentDesignIndex + 1) % designs.length;

  return design;
}

// Sleep function for delays
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Command handler with unique theme
astro_patch.smd({
  'cmdname': "menu",
  'desc': "Displays a stylish, readable command list",
  'react': '🧸',
  'type': 'user',
  'filename': __filename
}, async (context, message) => {
  try {
    // Display loading messages
    const loadingMessages = [
      "teddy be gatherin all your commands, please wait...❤️🧸"];
    for (const msg of loadingMessages) {
      await context.sendMessage(context.chat, { text: msg });
      await sleep(1000); // Wait for 1 second between messages
    }

    // Display the menu after loading
    const { commands } = require("../lib");
    const currentTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'Africa/Johannesburg' }));
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const currentDate = currentTime.toLocaleDateString();
    const currentTimeString = `${hours}:${minutes}`;
    const location = "Johannesburg, South Africa"; // Replace with actual location
    const temperature = await getTemperature(); // Fetch dynamic temperature

    // Choose the next menu design
    const design = getNextMenuDesign();

    // Organize commands by category
    const commandCategories = {};
    commands.forEach(cmd => {
      if (!cmd.dontAddCommandList && cmd.pattern) {
        if (!commandCategories[cmd.category]) {
          commandCategories[cmd.category] = [];
        }
        commandCategories[cmd.category].push(cmd.pattern);
      }
    });

    // Build the menu content based on the chosen design
    const header = design.header.replace("{botname}", Config.botname);
    const lineSeparator = design.lineSeparator;
    const footer = design.footer;

    let menuContent = `${header}`;
    menuContent += `${lineSeparator}🌡️ *Temperature:* ${temperature}°C\n`;
    menuContent += `${lineSeparator}🧸 *Owner:* ${Config.ownername}\n`;
    menuContent += `${lineSeparator}🌍 *Location:* ${location}\n`;
    menuContent += `${lineSeparator}📆 *Date:* ${currentDate}\n`;
    menuContent += `${lineSeparator}🕝 *Time:* ${currentTimeString}\n`;
    menuContent += `${lineSeparator}⌚ *Uptime:* ${runtime(process.uptime())}\n`;
    menuContent += `${lineSeparator}💾 *RAM Usage:* ${formatp(os.totalmem() - os.freemem())}\n`;
    menuContent += `${lineSeparator}📊 *Total Commands:* ${commands.length}\n\n`;

    // List commands by category with decorative separators
    for (const category in commandCategories) {
      menuContent += `${design.categorySeparator}`;
      menuContent += `${design.emoji} *${tiny(category)}* ${design.emoji}\n`;
      commandCategories[category].forEach(cmd => {
        menuContent += `${lineSeparator}${design.commandPrefix}${fancytext(cmd, 1)}\n`;
      });
    }

    menuContent += `\n${footer}\n\n${design.emoji} *${Config.botname}* - Your companion\n`;
    menuContent += `©2024 *errrbodyhatescylee*\n`;
    menuContent += `${readmore}`;

    // Box the menu content
    menuContent = `┏━━━━━━━━━━━━━━━━━━━━━━┓\n${menuContent}┗━━━━━━━━━━━━━━━━━━━━━━┛`;

    // Send the menu with a "forwarded" tag
    const menuOptions = {
      'caption': menuContent,
      'contextInfo': {
        'forwardingScore': 100, 
        'isForwarded': true,
        'externalAdReply': {
          'title': 'teddyBot-V1',
          'sourceUrl': 'https://whatsapp.com/channel/0029VatxrTiK5cDN43SzVq3b'
        }
      },
      'ephemeralExpiration': 3000
    };

    // Send the menu
    await context.sendUi(context.chat, menuOptions, context);

  } catch (error) {
    await context.error(`Error: ${error.message}`, error);
  }
});

// Function to fetch current temperature
async function getTemperature() {
  // Fetch temperature from an API or other source
  return "30°C"; // Placeholder value
    }
  
