import React, { Component } from 'react';
import Form from "./form";
import RecipeReviewCard from "./cards";
import DiscoverResults from "./discover-results";

class Main extends Component {
  render() {
    return (
      <main>

        <section className="results" id="discover">
          <h2>Discover</h2>
          <DiscoverResults/>
        </section>

        <section className="intro" id="about" >
          <h2>About Us</h2>
          <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel gravida nisi. Vestibulum ac consequat lorem. In in mi massa. Donec ut tellus sit amet sem ornare fermentum at et nunc. Pellentesque ac elementum metus. Praesent non venenatis lacus. In sagittis urna in nulla sagittis mattis.</p>
          </div>
        </section>


        <section id="contact" >
          <h2>Interested? Get in touch</h2>
          <Form />

        </section>

      </main>
    );
  }
}

export default Main;
