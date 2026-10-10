import { defineConfig } from '@playwright/test';
const remote=process.env.PUBLIC_SITE_URL;
export default defineConfig({testDir:'./tests',testMatch:'pages.spec.mjs',fullyParallel:false,workers:1,retries:0,timeout:60000,
 reporter:[['list'],['json',{outputFile:remote?'test-results/public-results.json':'test-results/local-results.json'}]],
 use:{baseURL:remote||'http://127.0.0.1:4174/WebsitedesignandPrompts/designbyxam/',viewport:{width:1280,height:800},actionTimeout:10000,screenshot:'only-on-failure',trace:'retain-on-failure'},
 ...(remote?{}:{webServer:{command:'npm run dev',url:'http://127.0.0.1:4174/WebsitedesignandPrompts/designbyxam/',reuseExistingServer:false,timeout:15000}})});
