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

        <section id="mission">
          <h2>Our Mission</h2>
          <div>
            <p>Integer sit amet venenatis erat. Cras elementum tortor odio, sit amet euismod nunc cursus ut. Donec sollicitudin orci sed enim volutpat, volutpat rutrum magna semper. Fusce leo lacus, pulvinar sit amet dignissim in, consectetur eget nulla. Etiam ac turpis augue. Sed tincidunt pulvinar tincidunt. Integer ac blandit magna. Nulla dapibus convallis luctus. </p>
            <p>Ut elementum urna sit amet elit egestas hendrerit. Vivamus quis sem fringilla, tincidunt nisi non, congue libero. Etiam cursus nulla quis sapien varius, eget accumsan augue mattis. Cras accumsan sapien nulla, eu eleifend odio tempus sit amet. Suspendisse gravida hendrerit sapien, ut molestie mi pellentesque eget. Aliquam eleifend velit vel libero elementum, vitae consectetur nisl sollicitudin. Suspendisse volutpat fringilla vehicula.</p>
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
