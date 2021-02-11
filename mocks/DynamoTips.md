Step 1: Build your entity-relationship diagram
Step 2: Identify Access Patterns, ie Social, Banks, Guests, Ai
Step 3: Design the primary key for the DynamoDB table and enable the core access patterns. based on -- three different kinds of data relationships: one-to-one, one-to-many, many-to-many\*\*-- you should optimize DynamoDB tables for the number of requests it receives.t DynamoDB does not have joins that a relational database has. Instead, you design your table to allow for join-like behavior in your requests.

In this module, you will learn about using an inverted index, a common design pattern for DynamoDB.
Inverted Indexes
Secondary indexes are crucial data modeling tools in DynamoDB. They allow you to reshape your data to allow for alternate query patterns.

https://aws.amazon.com/getting-started/hands-on/design-a-database-for-a-mobile-app-with-dynamodb/4/
https://www.mockaroo.com/

When designing the primary key for a DynamoDB table, keep the following best practices in mind:

Start with the different entities in your table. If you are storing multiple different types of data in a single table, such as employees, departments, customers, and orders, be sure your primary key has a way to distinctly identify each entity and enable core actions on an individual items.
Use prefixes to distinguish between entity types. Using prefixes to distinguish between entity types can prevent collisions and assist in querying. If you have both customers and employees in the same table, the primary key for a customer could be CUSTOMER#<CUSTOMERID> while the primary key for an employee could be EMPLOYEE#<EMPLOYEEID>.
Focus on single-item actions first, and then add multiple-item actions if possible. For a primary key, it’s important that you can satisfy the read and write options on a single item by using the single-item APIs -- GetItem, PutItem, UpdateItem, and DeleteItem. If you also can satisfy multiple-item read patterns with the primary key by using Query, that’s great. If not, you can always add a secondary index to handle the Query use cases.

\*\* Having a many-to-many mapping is usually an indication that you will want to satisfy two Query patterns, and our application is no exception. On the Friendship entity, we have an access pattern that needs to find all users that follow a particular user as well as an access pattern to find all of the users that a given user follows.

Because of this, we’ll use a composite primary key with both a HASH and RANGE value. The composite primary key will give us the Query ability on the HASH key to satisfy one of the query patterns we need. In the DynamoDB API specification, the partition key is called HASH and the sort key is called RANGE, and in this guide we will use the API terminology interchangeably and especially when we discuss the code or DynamoDB JSON wire format.
