USE sakila;
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
SELECT first_name, last_name
FROM actor
WHERE actor_id in
(
	SELECT actor_id
    FROM film_actor 
    WHERE film_id IN
    (
		SELECT film_id 
        FROM film
        WHERE title = 'Alone Trip'
	)
);

-- 7C Use JOIN to find all the names and email address of all Canadian customers
SELECT customer.email, country.country
FROM customer
INNER JOIN address ON customer.address_id = address.address_id
INNER JOIN city ON address.city_id = city.city_id
INNER JOIN country ON city.country_id = country.country_id
WHERE country.country = 'Canada';

SELECT customer.email, country.country
FROM customer, address, city, country
WHERE customer.address_id = address.address_id
AND address.city_id = city.city_id
AND city.country_id = country.country_id
AND country.country = 'Canada';

-- 7D Identify all movies categorized as Family Films
SELECT film.title, film.rating, category.name
FROM  film
INNER JOIN film_category ON film.film_id = film_category.film_id
INNER JOIN category ON film_category.category_id = category.category_id
WHERE category.name = 'Family';

SELECT film.title, film.rating, category.name
FROM film, film_category, category
WHERE film.film_id = film_category.film_id
AND film_category.category_id = category.category_id
AND category.name = 'Family';

-- 7E Display the most frequently rented movies in descending order
SELECT film.title, COUNT(rental.inventory_id) AS 'Times Rented'
FROM film
INNER JOIN inventory ON film.film_id = inventory.film_id
INNER JOIN rental ON inventory.inventory_id = rental.inventory_id
GROUP BY film.title
ORDER BY COUNT(rental.inventory_id) DESC;

-- 7F Write a query to display how much business, in dollars, each store brought in 
SELECT staff.store_id, SUM(amount) AS 'Total Sales By Store'
FROM payment
LEFT JOIN staff ON payment.staff_id = staff.staff_id
GROUP BY staff.store_id;

-- 7G Write a query to display for each store its Store ID, city, and Country
SELECT store.store_id AS 'Store ID', city.city AS 'City', country.country AS 'Country'
FROM store
INNER JOIN address ON store.address_id = address.address_id
INNER JOIN city ON address.city_id = city.city_id
INNER JOIN country ON city.country_id = country.country_id;

-- 7H List the top 5 genres in gross revenue
SELECT category.name AS 'Category', SUM(amount) AS 'Gross Revenue'
FROM category
INNER JOIN film_category ON category.category_id = film_category.category_id
INNER JOIN inventory ON film_category.film_id = inventory.film_id
INNER JOIN rental ON inventory.inventory_id = rental.inventory_id
INNER JOIN payment ON rental.rental_id = payment.rental_id
GROUP BY category.name
ORDER BY SUM(amount) DESC LIMIT 5;

-- 8A Create a view of 7H
CREATE VIEW top_five_genres AS
SELECT category.name AS 'Category', SUM(amount) AS 'Gross Revenue'
FROM category
INNER JOIN film_category ON category.category_id = film_category.category_id
INNER JOIN inventory ON film_category.film_id = inventory.film_id
INNER JOIN rental ON inventory.inventory_id = rental.inventory_id
INNER JOIN payment ON rental.rental_id = payment.rental_id
GROUP BY category.name
ORDER BY SUM(amount) DESC LIMIT 5; 

-- 8B Display the view created in 8A
SELECT * FROM top_five_genres;

-- 8C Delete 
DROP VIEW top_five_genres;