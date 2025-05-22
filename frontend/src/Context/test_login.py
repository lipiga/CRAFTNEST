from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from prettytable import PrettyTable
import time

# Setup WebDriver
service = Service("C:\\Drivers\\chromedriver-win32\\chromedriver.exe")
driver = webdriver.Chrome(service=service)

# Table to record results
table = PrettyTable()
table.field_names = ["Test Case", "Email", "Password", "Expected", "Actual", "Status"]

# List of login scenarios
test_cases = [
    {
        "name": "Email Doesn't Exist",
        "email": "nonexistent@example.com",
        "password": "Password@123",
        "expected": "User Doesn't Exist",
    },
    {
        "name": "Invalid Password",
        "email": "johndoe@example.com",
        "password": "WrongPassword@123",
        "expected": "Incorrect Password",
    },
    {
        "name": "Login Success",
        "email": "johndoe@example.com",
        "password": "Password@123",
        "expected": "user login success",
    }
]

# Run test cases
for case in test_cases:
    try:
        # Reload website and navigate to login
        driver.get("http://localhost:5173/")
        time.sleep(2)

        sign_up_button = driver.find_element(By.XPATH, '//button[text()="Sign Up"]')
        sign_up_button.click()
        time.sleep(1)

        login_link = driver.find_element(By.XPATH, '//p[contains(text(), "Already have an account?")]//span[text()="Login"]')
        login_link.click()
        time.sleep(1)

        # Fill login form
        driver.find_element(By.NAME, 'email').clear()
        driver.find_element(By.NAME, 'email').send_keys(case["email"])

        driver.find_element(By.NAME, 'password').clear()
        driver.find_element(By.NAME, 'password').send_keys(case["password"])

        # Submit form
        driver.find_element(By.XPATH, '//button[text()="Login"]').click()

        # Wait for toast or redirection
        try:
            toast = WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CLASS_NAME, "Toastify__toast-body"))
            )
            message = toast.text.strip()
        except:
            message = "Login successful"
        
        # Determine actual result and test outcome
        actual = message
        status = "PASS" if case["expected"].lower() in actual.lower() else "FAIL"
        table.add_row([case["name"], case["email"], case["password"], case["expected"], actual, status])
    
    except Exception as e:
        table.add_row([case["name"], case["email"], case["password"], case["expected"], str(e), "FAIL"])

# Close the browser
driver.quit()

# Print test summary
print("\nLogin Test Cases Summary:")
print(table)
