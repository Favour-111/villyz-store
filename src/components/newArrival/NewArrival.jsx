import React from "react";
import "./NewArrival.css";
import Item from "../items/Item";
import product from "../../product";
const NewArrival = () => {
  return (
    <div>
      <div className="container">
        <div className="Header-cont">
          <div className="Header-head">
            New <span>Arrival</span>
          </div>
          <div className="Header-content">
            shop on villyz for new arrivals and fast shipping
          </div>
        </div>
        <div>
          <div className="itemBody">
            {product.slice(0, 10).map((item) => (
              <div key={product.id} data-aos="fade-up">
                <Item product={item} />
              </div>
            ))}
          </div>
        </div>
        <div className="information-center">
          <div className="information-center-items">
            <div>
              <img
                src="data:image/png;base64,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"
                alt="truck--v1"
                width={50}
                height={50}
              />
            </div>
            <div className="information-Header">Fast shipping</div>
            <div className="information-content">
              Experience speedy delivery!
            </div>
          </div>
          <div className="information-center-items">
            <div>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAACK0lEQVR4nO2WMWgUURCGn1EjCiIWFhYRbdRSwULTRFBCQMm5M3mNWsrBcTN3UdBKWNNoJAFtbRQtLERsLAWxsQyIFhbaiAoSlTSiEZ388jZ7dy/xctW5Qb0fFnbZfW++nfnfm+dcTz11QawLCJcrWuUy1pPYZAOAxKZ8iv7CAEhsqhG8ddl0kQCfQ1BfxSFWDGYAYnNFAnxc/GsMutUQq12JUv8pPA+lWFcYgE/RH3xAYrMRyFW3GuKWBz4UF1RsruEBrxjKl+JscQBq08uXYdgXCvUAxxBil73HWvffbMX/ttIUfawYJrW7LPaW1H6y2ntSu32iit1/LLAX7GKxCRJ783ujaTr9CwtOdz04iz0gMYtc/ZoEF30de/xZbCTBXla7Fb2/kygOjp7H5q4AkNrNfDt9xlUcdg5r4pI07scUZ1hsvl12Vprbl7ElUWiAXjkDNRzJUqz2KgRPxrGdBBdY7SWpPU8UI80Ja9jBatdZbYbUvrUAWtDZd3XsY7EbWdmaoNjfFiBN0Udi7/I6P2GxH20OHI/CpJ0yOaLYMKY4RWJPo3ELYWxSQ9KxY3K0s5HYd1a7nwiOkeJc4wASfBJWQ6mCgXhsqY6doSUv6Y6hX4hdCz7qBN1USA+LvUgU416xrfXGuZMVbM0A8/qT2NcQMKlilNQeLjGw2kzwyvEyNrluq1TBQF7XKGD2t/Okdo8ER10R4ioOsNjjRd/YpeUZK0xptER7+uv0C8E25eY+y2tqAAAAAElFTkSuQmCC"
                alt="hand-holding-dollar"
                width={50}
                height={50}
              />
            </div>
            <div className="information-Header">24 x 7 support</div>
            <div className="information-content">
              Contact us 24 hours a day 7 days a week
            </div>
          </div>
          <div className="information-center-items">
            <div>
              <img
                src="data:image/png;base64,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"
                alt="discount--v1"
                width={50}
                heights={50}
              />
            </div>
            <div className="information-Header">30 days return</div>
            <div className="information-content">30 days return policy</div>
          </div>
          <div className="information-center-items">
            <div>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFFklEQVR4nO1ZS2hcVRi+o4iiIr4FQbT1hVUqGqVg1VpFrZo2uedkFtpCFkps5/7/nWgXpS7Mxk3RlVra+qK4EFuiS18FN6KmvipFd65ai6ggSFtF7e8n37n3JtM0M73TzAxB5oNLTs7jP+c/539PFPXRRx999PF/QbWGa+IEa2KFesUmfmyzb1hxdbSQ4QV3ObVXvNohr//CiR1xavud2mf5t599HOMczq2muDNaKPCCh7zYF07tmFN7zwke54s0m8+xEcUTXuz9fM3eWLGqt6duQFVxiRd716n97dS2uhqujOaAG8difnONDdVxlVPb5sX+8WqTjz6Ni6NewtexLIiH2L44xU2zGXRqX05M4LQwV5HwY5t9HOOc4+ilWOrVvvZiB+MUt/eGiRT3ZbJuk+s24pz88Et8gsFsBipecUfT9WEMFbadYvVwHTewvUpxpld7zakd5h7dZaKOZTkTLxSHCQeq4W6n2NAuvVhQ49qZHlS82hYy07WXCToRLJJNcsPBMZxdTTHQMfopBkiTtJ3Y6xSzruhMUGyxfdPilGLAie3qFH3SihPcWoiZE/smu7QOm1hap9mK3U3EgptpzVyCBztGNPcTW9keTnBdVbGi9FpF4gQby853ipW+hhvzfXc4samoE6D3DY4r9xO8ocKctsJjG3DBiGItL8GrfesF69hXygAk2StUBYvC3oLl82bEib1Kj93OmjjB/U7slywcafzs53ZNq1f7yKltb/vgcxA6xLCD7dUpLms0u3NhreI8MuHE/vApRr3Ym07tHZ9gvVP704n9OlTH+a13RSXbK4pcijFasHkxwbiIN1lErJmYNHd20zLOoFFtW77mRZrTvP2cU/uNL9aShmA5Y7CckWsDvSZhTikw7KZzKl6hCDtagaKTi9EHsxlpBxP5Xvzr1Y7ORA6nAOYQTu27dtZUazjXif0YmBH72Il96tXeLnMJzeDEvi9jYJoTUGzmQUJ7HIvLEqOz9GI/NCo6dcOrvTQ7YGxptsczccryGWzuOSOBmSpOpxmlH6BeOLG/8lc6WH0KF/aWEYG0K1onHCjXEcZNXm1P9kLY1FPRiqnsYkcKZR8bwxknW0OvT5O5JsHljYyEtuKBRovWCmP5Xh1R9sL8FqkrTWIJ8/tsrhMvn8CI4BmOxYrxk0YTkoUmDInCGQSLTpmRsLnaIebYbGdhdWuHmIvQgZyZT5j5MWpmJOvEzKn9FK/Hpa13RaUI4elISS+aL/LKSPAJZRFycbFdM1WTwNTvTu2toQ24oh1aXm1PGVEsHTTycPzfpXiY/qW05VJ7ox0/4gUp04bpwkWngsZAUG1vcSvMsY9PT1ujWsf1zOlLz1esKPJ4SkPHwniCdadQskmxNOoRvOIWvsbJ4rJTIByU9SumoV1JddV2F6nu6CjOooFgX9RpBGskdpAlmx4UH3bSUg0nuCjqBliiCXUntS3HlYMUKxkFtE2PRe4E98z0gEw8H/ZIcFvU9QKd2mE6uWkxUyyZKRKgwoJ20/VhLLsE6l6h2Lk47Qw1LcG9US/Al6GYsWTDascJJVOxqblKpsEci03NrlcFxc6c5oGuv0QTDz4ZrJnYjmYhRKsidhjLagKsyu/umk6UQUOofsyJfciAkfHR3KEMKhwbETwZPDZDFrGpjpvY+SDPs7dnli2kukeZAnixz/mxHQoS2dgBOtiOeexuISRhCQZz/Qg/vbEdCx6ZdxTbRx999NFHtIDwHx0u/OyggK/XAAAAAElFTkSuQmCC"
                alt="cheap-2"
                width={50}
                height={50}
              />
            </div>
            <div className="information-Header">Secure payment</div>
            <div className="information-content">
              Enjoy secured and fast payment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
