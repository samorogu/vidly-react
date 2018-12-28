## This is the exercise code for the vidly proyect

### Setting up the vidly project

First we have to create the app, install boostrap and font-awesome:

```
create-react-app vidly

npm i bootstrap@4.1.1 font-awesome@4.7.0
```

In index.js we import the css of bootstrap `import 'bootstrap/dist/css/bootstrap.css';` and font-awesome: `import 'font-awesome/css/font-awesome.css';`

Web pack will pull this css files to the bundle in production.

The we have to delete the black banner and put a simple [boostrap template](https://getbootstrap.com/docs/4.1/examples/starter-template/)

In the source code we will ignore the navigation bar. The container will be the class that will use.

In the app.js we will delete the black banner in the return statement and include the main container with the className (it is important to recall that className is used in jsx to call clases when babel compiles the code):

```
      <main className="container">
        <h1>Hello World!</h1>
      </main>
```

If we open the inspector, the logo will pop up a warning so we have to delete the import in app.js the logo.

In the folder services we will find a bunch of movie classes and usefull functions for the next exercise. It is important to note that \_id is the identifier of each of the movies, it is not casual, mongodb uses this prefix.

### Exercise

Create a movie component displaying the movies in a table defined in the fake moviservices.js A message on the top with the total of numbers. A delete button that erase each movie. Finally if the movie counts reach to zero, the message has to display the are no movies in the database.
