'use strict';
const puppeteer = require('puppeteer');
var fs = require('fs'),
    request = require('request');
async function launchBrowser(){
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox','--disable-notifications'],
    });
    return browser;
}
async function run() {
    const browser = await launchBrowser();
    const page = await browser.newPage();
    await page.goto('https://page-preview.instapage.com/api/v1/page/html?roomHash=1d9a6b8ad4d69bd91a3cc846e776faf15676145a3a16eac1da773adabf1e0a8d&version=newest&variation=A&responsiveMode=null');
    await sleep(10000);
    const html = await page.evaluate(() => {
        const html = document.querySelector('html').outerHTML;
        return html;
    });
    fs.writeFile('landingpage.html',html, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}
run();
function sleep(ms) {
    return new Promise(
        function(resolve, reject) {
            setTimeout(resolve, ms);
        }
    );
}

