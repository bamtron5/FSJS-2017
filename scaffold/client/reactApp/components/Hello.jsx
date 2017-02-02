import React, { Component } from 'react';

export default class Hello extends Component {
  render() {
    return (
      <section>
        <div className="container">
          <div className="header clearfix">
            <nav>
              <ul className="nav nav-pills float-right">
                <li className="nav-item">
                  <a className="nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Contact</a>
                </li>
              </ul>
            </nav>
            <h3 className="text-muted">Project name</h3>
          </div>

          <div className="jumbotron">
            <h1 className="display-3">Jumbotron heading</h1>
            <p className="lead">Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
            <p><a className="btn btn-lg btn-success" href="#" role="button">Sign up today</a></p>
          </div>

          <div className="row marketing">
            <div className="col-lg-6">
              <h4>Subheading</h4>
              <p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>

              <h4>Subheading</h4>
              <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>

              <h4>Subheading</h4>
              <p>Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
            </div>

            <div className="col-lg-6">
              <h4>Subheading</h4>
              <p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>

              <h4>Subheading</h4>
              <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>

              <h4>Subheading</h4>
              <p>Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
            </div>
          </div>

          <footer className="footer">
            <p>© Company 2017</p>
          </footer>

        </div>
    </section>
    );
  };
};
