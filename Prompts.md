## LIST OF PROMPTS TO CREATE THE FRAMEWORK

The following is the record of all prompts sent to the agent to create the test plans, create the test cases and fix itself. 

No prompt was polished or repeated, single prompt execution every time.

----

### 1\. Auth prompt

**New chat was created for a clean prompt**

```
Using the baseURL (do not hardcode the url), generate a test plan using consistent POM for all accepted usernames:
standard_user
locked_out_user
problem_user
performance_glitch_user
error_user
visual_user

the password for each one of them is secret_sauce

Each one must have an assertion to validate succesful and unique login.
```

Output: ```specs/AUTH_TEST_PLAN.MD```

----

### 2\. Ecommerce prompt using fixed test cases 

**New chat was created for a clean prompt**

Using the baseURL (do not hardcode the url), generate the following tests using consistent POM and login in with standard_user:
* Add 1 product to the cart and finalize the transaction, validate the transaction is completed at the end.
* Add 1 products to the cart from the listing view, add 2 different random products from the detailed view (click on the product name) and finalize the transaction, validate the transaction is completed at the end.
* Add a random number of products between 2-5 to the cart selecting randomly from the listing view and detailed view, then delete them all and validate the cart is empty. The random number of products must change on each run, do not hardcode numbers.

Output: Since I didn't asked for a test plan, no test plan was created

----

### 3\. Ecommerce prompt for edge cases

**The following prompt was pasted in the same chat for continuity**

Now I need you to create a test plan for 4 edge cases, using the same user, and continuing with POM structure.

Output: specs/ECOMMERCE_EDGE_CASES_TEST_PLAN.MD

----

### 4\. Visual assertions  using fixed test cases

**New chat was created for a clean prompt**

Using the baseURL (do not hardcode the url),  generate the following tests using consistent POM and login in with standard_user
* Screenshot assertion for the main page
* Screenshot assertion for the inventory (listing) page
* Screenshot assertion for the detailed page of EACH product (all 6 of them)
* Screenshot assertion for cart page adding the first and last product beforehand

Output: Since I didn't asked for a test plan, no test plan was created

----

### 5\. Visual assertions for the visual_user

**The following prompt was pasted in the same chat for continuity**

Now I need you to create a test plan using the visual_user which will fail some test cases because that's how it was created. 

----

### 6\. Healer

**If you have reached to this point, ran all test cases and have no errors, congrats! Your LLM is smarter than mine. I have to run the healer because my tests are not working**

Run and fix the tests. If needed, increase the threshold of the screenshot to 5%