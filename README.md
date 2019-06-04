# Hero Book
> Blocks: 1-4

Hero Book is an application that allows users to read about their favorite super heroes. It's got some nifty features:

Features:

* Search for heroes
* View individual heroes
* Filter heroes by their attributes

Additional optional features:

* User registration
* User favorites lists

## Setup
It's recommended to install Augury for your Chrome dev tools. It's a good tool for inspecting Angular components within the browser. It can also be useful to yield insights and understanding about how your application works. It is not required, but it's very helpful.

``` 
git clone this_repo
cd herobook
npm install
ng serve -o
```

The Materialize CSS framework is already installed in this project and ready to use. You can easily apply styling by using the documentation: https://materializecss.com/navbar.html

## Part I: TDD in Angular

Let's split up into groups of 3 to research some aspects of angular testing. The topics:

1. [Testing components](https://angular.io/guide/testing#component-test-basics)
2. [Testing services](https://angular.io/guide/testing#service-tests)
3. [Testing routes](https://angular.io/guide/testing#testing)
4. [Testing forms](https://angular.io/guide/testing#testing)
5. [Testing classes/models](https://angular.io/guide/testing#testing)
6. [Testing templates/DOM](https://angular.io/guide/testing#testing)
7. [Testing utilities](https://angular.io/guide/testing#testing-utility-apis)

Each group should research the following:

- a description of how to test given feature
- any additional setup required to begin testing
- a short list of test common assertions and matchers for that feature

**Important Terms**
- `TestBed`: the test application environment
- `fixture`: a component
- Mock: a substitute for an object

Here are some common testing objects and matchers:

**Creating/Fetching Objects**
- Create a component: `fixture = TestBed.createComponent(MyComponent)`
- Create an instance: `fixture.componentInstance`
- Update component with data: `fixture.detectChanges`
- Get the main component HTML element: `fixture.nativeElement`

**Common Matchers**
- `expect(actual).toEqual(expected)`
- `expect(actual).toContain(expected)`
- `expect(actual).toBeTruthy()`
- `expect(actual).toBe(expected)`

For every component you test, it's dependencies should be added to declarations of the `TestBed`.


## Part II: Testing Components

Throughout, our approach to testing follows these 3 steps:

1. Read the requirements. They describe what's to be tested.
2. Create the test case.
3. Add a simple assertion first.

After you've completed these steps, begin SEAT (setup, exercise, assert, tear down). 

Since Angular provides us with matching tests for every module we create, we'll start by first updating the tests for `AppComponent`.


### Add a new `NavComponent`

Create a new component named 'nav' and open the tests and template for it. Here are the test requirements for NavComponent: 

1. Successfully creates the 'Nav' component
2. Displays <nav> with 'Hero Book' logo on it.

First, let's examine the 'should create' test. The working example uses the `TestBed` to create a component instance. However, we can also test the `NavComponent` in isolation. Change the test to look like this:

```typescript
  it('should create', () => {
    const instance = new NavComponent();
    expect(instance).toBeTruthy();
  });
```

The test should still pass. So here we can see that unit testing a single component in isolation can be done by just using the component itself, with little test setup.

Most tests will work fine using the `fixture` and `component` variables we've already setup for the suite. But try to be aware of when you should test things in isolation.

Now add a test in `nav.component.spec.ts` for the next requirement and make it fail. In this example, I've decided I'll have a nav bar in this component and it will contain a link named 'Hero Book' to the the homepage.

```typescript
  it('should have nav logo', () => {
    fixture = TestBed.createComponent(NavbarComponent);
    const el = fixture.nativeElement;
    expect(el.querySelector('.brand-logo').innerText).toContain('Hero Book');
  });
```

We can make this test pass with the following code:

<details>
<summary>Click to view solution</summary>

```html
<nav><a href="/" class="brand-logo">Hero Book</a></nav>
```

</details>

Take a moment to understand how this works before moving onto the next part.


### Integration Testing the NavbarComponent with AppComponent

Add the new nav selector to `app.component.html`. Let's try to create tests for the following:

1. Successfully loads `NavbarComponent`

Before writing any code, re-run the tests. The `AppComponent` tests should start failing with this error:

```
'app-navbar' is not a known element:
  1. If 'app-navbar' is an Angular component, then verify that it is part of this module.
	2. If 'app-navbar' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message. ("<div class="container">
```

This component has a new dependency. If you declare `NavbarComponent` in the `TestBed`, the tests should pass again.

Whenever you're testing components that contain other components, you'll need to configure the `TestBed` to import them. Otherwise, you'll get errors when the test app tries to load the components.


### Step 1: Testing the Search Bar

Requirements for the AppComponent:

**Homepage (AppComponent)**
- has navigation
- has search bar with placeholder text 'Search'

Start with our 3-step test setup:

```typescript
  it('should have a search bar with placeholder text', () => {
    // Setup
    
    // Exercise
    
    // Assert
    expect(el.querySelector('input').placeholder).toEqual('Search');
    
    // Teardown (as needed)
  });
```

By writing the assertion first, its clear to see what you need to do to set this up: 

1. You'll need to access the component's elements.
2. You'll need an instance of the component.

In the setup, create an instance of the `AppComponent`. Then use the `nativeElement` property of the instance to get the components HTML.

Finally, use the DOM API to query the right selector for the test.

```typescript
  it('should have a search bar with placeholder text', () => {
    // Setup
    fixture = TestBed.createComponent(AppComponent);
    // Exercise
    const el = fixture.nativeElement;
    // Assert
    expect(el.querySelector('input').placeholder).toEqual('Search');
  });
```

How much code is needed to make this test pass? Make an attempt before viewing the answer below!

The test should fail, and then you can begin writing the code to make it pass.

<details>
<summary>Click to view solution</summary>

```html
  <form>
    <input type="text" placeholder="Search">
  </form>
```

</details>


## Step 2: Creating the SearchForm Component

At this stage we can see that the search form on AppComponent can be placed in it's own component instead.

1. Create the search form component. 
2. Cut and paste the form HTML from `app.component.html` into `search-form.component.html`. 
3. Add the new `<app-search-form>` HTML element to `app.component.html` where the search form used to be.

If you've got a good handle on creating forms within components and templates,, then testing them will feel a little familiar. The same code you usually use to access the form and check its validity works just as well in tests.

Once the new component is created, open `search-form.component.ts` and the matching spec file. Run the tests. 

Before writing new tests, always review the requirements. In this case, there aren't very many requirements so you'll need to create them. How might you approach creating your own requirements?

Think about what you want the search for to do. From the user's perspective, they should be able to visit Hero Book, type a hero's name into a search box, and view the results.

But as a developer, there are certain features of a search form you want to make sure are included. So here's how we might describe the requirements for a search form.

``` 
Search Form Component
- should have a search form
- should require an input field for user queries (*)
- should validate user's form input (*)
- should return search results
- should display a message if there are no results
```
> *: These two requirements could translate into 1-2 tests based on whether the form is implemented using Template-Driven vs. Dynamic forms.

Go ahead and write the outlines of each test case using the requirements above. 

Then try to add the assertions that you think you'll need to make the test green.

**Pass one test case at a time.**

<details>
<summary>Click to see examples of the base test cases</summary>

```typescript
it('should have a search form', () => {
  
});

xit('should require input field for users query', () => {
  
});

xit('should validate users form input', () => {
  
});

xit('should return search results', () => {
  
});

xit('should display a message if no results found', () => {
  
});
```

</details>

> NOTE: To skip tests, simply add an 'x' to the beginning of the test case as you see here. Remove the x to run the tests. Otherwise, running empty tests will return a passing test, which isn't helpful.

Let's add some code to test the first requirement. It says to make sure that the component has a form. So add an assertion which says exactly that: `expect(searchForm).toBeTruthy()`.

Now that we see what's being tested, it's a little easier to know what you need to do next:

1. Create an instance of the component.
2. Get the search form HTML from the component.

That will take care of the setup and exercise steps. Once you've finished, re-run the tests. It should pass.

```typescript
it('should have search form', () => {
  // Setup: create an instance of the component
  const sfc = fixture.nativeElement;
  // Exercise: get the value of the form property
  const searchForm = sfc.querySelector('form');
  // Assert: test that the property isn't null or undefined
  expect(searchForm).toBeTruthy()
});
```

So far, we're using a Template Driven form. Remember, least amount of code possible to make the test green!

### Step 3: Complete the remaining tests

We've covered:

1. Angular testing syntax and setup
2. Common Angular testing objects (TestBed, matchers, components)
3. How to define your own requirements
4. Applying SEAT to testing components

Use this new knowledge to complete the remaining tests for the `SearchFormComponent`.


## Hero Book, GO!

Your task is to use TDD to develop the remaining features for this app. Below are some stories to get you started, but you're not limited to the components, services and models listed below. Use all of your knowledge of Angular to meet the requirements.

You'll find json data files in the `srce/app/data` folder. Use it to help you understand the shape of the data and the different objects your app will eventually use and to develop stronger tests.

*Hero Book API*
http://herobookapi.herokuapp.com/api/v1/heroes/

Use this api to CRUD data for your app. No authentication required. Check with your instructor about open access to make PATCH AND PUT/POST requests. The API has read-access, but could require a key for write-access.


### Requirements

**Homepage (AppComponent)**
- has navigation (routes)
- has search bar
- renders other components, such as lists of heroes and hero details

**Heroes**
- have unique page
- have stats displayed on their page
- can be updated

**Search**
- can search for heroes by name
- can view search results
- STRETCH GOAL: has filters to search by: powers, species, and gender

**Users (all optional stretch goals)**
- STRETCH: can register 
- STRETCH: can login 
- STRETCH GOAL: can have a favorites list
- STRETCH GOAL: can add favorites to their list
