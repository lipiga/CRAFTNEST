import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from prettytable import PrettyTable

# Setup WebDriver
service = Service("C:\\Drivers\\chromedriver-win32\\chromedriver.exe")
driver = webdriver.Chrome(service=service)

def test_seller_login_and_add_product():
    seller_login_result = "❌ Failed"
    add_product_result = "❌ Failed"

    try:
        # Step 1: Open the website
        driver.get("http://localhost:5173")
        driver.maximize_window()
        time.sleep(2)

        # Step 2: Click on "Become a Seller"
        driver.find_element(By.XPATH, "//ul//li[contains(text(), 'Become a Seller')]").click()
        time.sleep(2)

        # Step 3: Click on "Login"
        driver.find_element(By.XPATH, '//p[contains(text(), "Already have an account?")]//span[text()="Login"]').click()
        time.sleep(2)

        # Step 4: Login
        driver.find_element(By.NAME, "email").send_keys("ajitha@gmail.com")
        password_input = driver.find_element(By.NAME, "password")
        password_input.send_keys("ajitha1234")
        password_input.send_keys(Keys.RETURN)
        time.sleep(3)

        # If login steps completed without error, mark as passed
        seller_login_result = "✅ Passed"

        # Step 5: Click on "Add Products"
        driver.find_element(By.XPATH, "//ul//li[contains(text(), 'Add Products')]").click()
        time.sleep(2)

        # Step 6: Fill the form
        driver.find_element(By.ID, "name").send_keys("Rose Leaf Handmade Soap")
        driver.find_element(By.ID, "product_detail").send_keys(
            "Nature’s beauty meets gentle skincare with our Rose Leaf Handmade Soap. Shaped like a delicate rose leaf and infused with the soothing fragrance of fresh roses, this soap offers a luxurious cleansing experience. Enriched with nourishing oils and natural ingredients, it leaves your skin feeling soft, refreshed, and lightly scented. Ideal for gifting or daily pampering, this beautifully crafted soap brings a floral touch to your bath routine.")
        driver.find_element(By.ID, "price").send_keys("199")
        driver.find_element(By.ID, "category").send_keys("Soap")
        driver.find_element(By.ID, "stock").send_keys("50")
        driver.find_element(By.ID, "image").send_keys("D:\\Lipiga\\MCA\\SE LAB\\TESTING\\samplePhotos\\roseleaf.jpeg")

        # Submit the form
        driver.find_element(By.XPATH, "//button[text()='Add']").click()
        time.sleep(3)

        # If all product steps completed without error, mark as passed
        add_product_result = "✅ Passed"

    except Exception as e:
        print(f"\nError during test: {e}")

    finally:
        # Display result table
        table = PrettyTable()
        table.field_names = ["Functionality", "Result"]
        table.add_row(["Seller Login", seller_login_result])
        table.add_row(["Add Product", add_product_result])
        
        print("\nIntegration Test Result Summary:\n")
        print(table)

        driver.quit()

# Run the test
test_seller_login_and_add_product()
