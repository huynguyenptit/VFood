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
    await page.goto('https://www.foody.vn');
    await sleep(10000);
    const html = await page.evaluate(() => {
        const html = document.querySelector('html').outerHTML;
        return html;
    });
    fs.writeFile('trangchu.html',html, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}
// run();
function sleep(ms) {
    return new Promise(
        function(resolve, reject) {
            setTimeout(resolve, ms);
        }
    );
}
