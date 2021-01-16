import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { Reservations } from "./components/Reservations";
import { AddMeal } from "./components/AddMeal";
import { NavigateBar } from "./components/NavigateBar";
import { Reviews } from "./components/Reviews";
import { TotalReview } from "./components/TotalReviews";
import { ContactUs } from "./components/ContactUs";
import { Menu } from "./components/Menu";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <br />
        <HomePage />
      </Route>
      <Switch>
        <Route path="/meals/reservations/:id">
          <NavigateBar />
          <br />
          <Reservations />
        </Route>
        <Route path="/meals/reviews/:id">
          <NavigateBar />
          <br />
          <Reviews />
        </Route>
      </Switch>
      <Route exact path="/meals">
        <NavigateBar />
        <br />
        <AddMeal />
      </Route>
      <Route exact path="/reviews">
        <NavigateBar />
        <br />
        <TotalReview />
      </Route>
      <Route path="/menu">
        <NavigateBar />
        <br />
        <Menu />
      </Route>
      <Route path="/contactus">
        <NavigateBar />
        <br />
        <ContactUs />
      </Route>
    </Router>
  );
}

export default App;
