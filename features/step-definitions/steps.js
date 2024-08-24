const { Given, When, Then } = require("@wdio/cucumber-framework");

Given("I am on the Sauce Demo login page", async () => {
  await browser.url("https://www.saucedemo.com");
});

When(
  "I login with username {string} and password {string}",
  async (username, password) => {
    await $("#user-name").setValue(username);
    await $("#password").setValue(password);
    await $(".btn_action").click();
  }
);

Then("I should see {string}", async (message) => {
  if (message === "the inventory page") {
    await $(".inventory_list").waitForDisplayed({ timeout: 10000 });
    await expect($(".inventory_list")).toBeExisting();
  } else if (message === "a login error message") {
    const errorMessage = await $(".error-message-container").getText();
    await expect(errorMessage).toContain(
      "Sorry, this user has been locked out."
    );

    // Memicu error untuk menangkap screenshot saat kondisi gagal yang diharapkan
    if (!errorMessage.includes("Sorry, this user has been locked out.")) {
      throw new Error("Expected login error message not found");
    }
  }
});
