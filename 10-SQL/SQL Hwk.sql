SELECT * FROM actor;

-- 1A Display the first and last name
SELECT first_name, last_name 
FROM actor;

-- 1B Display the first and last name in a single column in upper case letter named Actor Name
SELECT CONCAT(first_name, ' ', last_name) 
AS 'Actor Name'
FROM actor;

-- 2A Find ID#, first & last name of actor whose first name is "Joe"
SELECT * FROM actor
WHERE first_name = 'Joe';

-- 2B Find all actors with last name that has the letters GEN
SELECT * FROM actor
WHERE last_name 
LIKE '%Gen%';

-- 2C Find all actors with last name that has the letters LI then order it by last name, first name
SELECT last_name, first_name 
FROM actor
WHERE last_name 
LIKE '%Li%';

-- 2D Using IN, display country-Id and country columns of the following countries: Afghanistan, Bangladesh, and China
SELECT * FROM country
WHERE country 
IN ('Afghanistan', 'Bangladesh', 'China');

-- 3A Add middle_name column in actor table, and position it inbetween first_name and last_name
ALTER TABLE actor
ADD COLUMN middle_name VARCHAR(100) 
AFTER first_name;
SELECT * FROM actor;

-- 3B Change data type of middle_name column to blobs
ALTER TABLE actor
MODIFY COLUMN middle_name blob;
SELECT * FROM actor;

-- 3C Delete middle_name column
ALTER TABLE actor DROP COLUMN middle_name;
SELECT * FROM actor;

-- 4A List last name of actors as well as how many actors have that last name
SELECT last_name, COUNT(last_name)
FROM actor
GROUP BY last_name;

-- 4B List last names of actors and number of actors who have that last, but only for those with at least 2 actors
SELECT last_name, COUNT(last_name) AS 'At least 2 actors'
FROM actor
GROUP BY last_name
HAVING COUNT(last_name) >=2;

-- 4C Change GROUCHO WILLIAMS to HARPO WILLIAMS 
UPDATE actor
SET first_name = 'Harpo', last_name = 'Williams'
WHERE first_name = 'Groucho' AND last_name = 'Williams';

SELECT * FROM actor
WHERE first_name = 'Harpo' AND last_name = 'Williams';

-- 4D Change HARPO WILLIAMS back to GROUCHO WILLIAMS
UPDATE actor
SET first_name = 'Groucho'
WHERE actor_id = '172';

SELECT * FROM actor
WHERE actor_id = '172';

-- 5A Re-create schema of address table
SHOW CREATE TABLE address;
SELECT * FROM address;

-- 6A JOIN staff and address tables and show first & last name, and address
SELECT staff.first_name, staff.last_name, address.address
FROM staff
INNER JOIN address ON staff.address_id = address.address_id;

-- 6B JOIN staff and payment tables for total amount rung up by each staff member in August of 2005
SELECT staff.staff_id, staff.first_name, staff.last_name, SUM(amount) AS 'Total Sales in August 2005'
FROM payment
INNER JOIN staff ON payment.staff_id = staff.staff_id
WHERE payment.payment_date >= '2005-08-01 00:00:00' AND payment.payment_date <='2005-09-01 00:00:00'
GROUP BY payment.staff_id;

-- 6C JOIN film_actor and film and list each film and number of actors who are listed for that film
SELECT COUNT(film_actor.film_id) AS 'Total actors in film', film.title
FROM film_actor
INNER JOIN film ON film_actor.film_id = film.film_id
GROUP BY film.title;

-- 6D How many copies of Hunchback Impossible exist in the inventory
SELECT film.film_id, COUNT(inventory.inventory_id) AS 'Total Inventory', film.title
FROM inventory
INNER JOIN film ON film.film_id = inventory.film_id
WHERE film.title = 'Hunchback Impossible'
GROUP BY film.title;

-- 6E Join payment and customer, list total paid by each customer, and list customers alphabetically by last name
SELECT customer.last_name, customer.first_name, SUM(payment.amount) AS 'Total Spent'
FROM payment
INNER JOIN customer ON payment.customer_id = customer.customer_id
GROUP BY customer.last_name;

-- 7A Using sub-queries display the titles of movies starting with the letters K and Q whose language is English
SELECT first_name, last_name
FROM actor
WHERE actor_id IN
(
  SELECT actor_id
  FROM film_actor
  WHERE film_id IN
  (
   SELECT film_id
   FROM film
   WHERE title = 'ALTER VICTORY'
  )
);

SELECT title
FROM film
WHERE language_id IN 
(
	SELECT language_id
    FROM language
    WHERE name = 'English'
)
AND title LIKE 'k%' OR title LIKE 'q%';

-- 7B Display all actors who appear in film Alone Trip

