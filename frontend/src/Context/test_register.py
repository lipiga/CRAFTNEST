from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import pandas as pd

# Setup
service = Service("C:\\Drivers\\chromedriver-win32\\chromedriver.exe")
driver = webdriver.Chrome(service=service)
driver.get("http://localhost:5173/")
time.sleep(2)

# Open sign up form
sign_up_button = driver.find_element(By.XPATH, '//button[text()="Sign Up"]')
sign_up_button.click()
time.sleep(2)

# Password test cases
test_cases = [
    {"Test #": 1, "Password": "password@123", "Reason": "No uppercase", "Expected": "INVALID"},
    {"Test #": 2, "Password": "Password123", "Reason": "No special character", "Expected": "INVALID"},
    {"Test #": 3, "Password": "Pass@1", "Reason": "Less than 8 characters", "Expected": "INVALID"},
    {"Test #": 4, "Password": "password", "Reason": "No uppercase and no special character", "Expected": "INVALID"},
    {"Test #": 5, "Password": "Password@123", "Reason": "Meets all constraints", "Expected": "VALID"},
]

results = []

def wrap_text(text, width=37):
    return '\n'.join([text[i:i+width] for i in range(0, len(text), width)])

for test in test_cases:
    try:
        # Refresh form
        driver.refresh()
        time.sleep(2)

        # Open sign up form again
        sign_up_button = driver.find_element(By.XPATH, '//button[text()="Sign Up"]')
        sign_up_button.click()
        time.sleep(2)

        # Fill the form
        driver.find_element(By.NAME, 'name').send_keys("Test User")
        driver.find_element(By.NAME, 'email').send_keys(f"test{test['Test #']}@example.com")
        driver.find_element(By.CSS_SELECTOR, 'input[type="file"]').send_keys(
            'D:\\Lipiga\\MCA\\SE LAB\\TESTING\\samplePhotos\\susmitha.jpg'
        )
        driver.find_element(By.NAME, 'password').send_keys(test["Password"])

        # Submit the form
        driver.find_element(By.XPATH, '//button[text()="Register"]').click()

        # Wait for toast to appear
        toast = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.CLASS_NAME, "Toastify__toast-body"))
        )
        message = toast.text.strip().lower()

        # Determine outcome
        if "success" in message or "registered" in message:
            actual = "VALID"
        else:
            actual = "INVALID"
    except Exception as e:
        actual = "INVALID"
        message = str(e)


    result = {
        "Test #": test["Test #"],
        "Password": test["Password"],
        "Reason": wrap_text(test["Reason"]),
        "Expected": test["Expected"],
        "Actual": actual,
        "Toast Message": wrap_text(message),
        "Result": "Pass" if test["Expected"] == actual else "Fail"
    }
    results.append(result)

# Close browser
driver.quit()

# Convert results to DataFrame
print("\nRegistration(Password Validation) Test Cases Summary:")
df = pd.DataFrame(results)
print(df.to_markdown(index=False))
