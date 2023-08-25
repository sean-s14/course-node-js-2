const puppeteer = require("puppeteer");
const sessionFactory = require("../factories/sessionFactory");
const userFactory = require("../factories/userFactory");

class CustomPage {
  static async build() {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    const customPage = new CustomPage(page, browser);

    return new Proxy(customPage, {
      get: function (target, property) {
        return customPage[property] || browser[property] || page[property];
      },
    });
  }

  constructor(page, browser) {
    this.page = page;
    this.browser = browser;
  }

  async login() {
    this.user = await userFactory.createUser();
    const { session, sig } = sessionFactory(this.user);

    await this.page.setCookie({ name: "session", value: session });
    await this.page.setCookie({ name: "session.sig", value: sig });
    await this.page.goto("localhost:3000/blogs");
    await this.page.waitFor('a[href="/auth/logout"]');
  }

  getContentsOf(selector) {
    return this.page.$eval(selector, (el) => el.innerHTML);
  }

  async close() {
    // Cleanup user and blogs
    if (this.user) {
      await userFactory.deleteUserBlogs(this.user);
      await userFactory.deleteUser(this.user);
      this.user = null;
    }
    return await this.browser.close();
  }
}

module.exports = CustomPage;
