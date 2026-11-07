import type { Metadata } from 'next';
import Link from 'next/link';
import '../globals.css';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Overview | Natours',
  description: 'Explore exciting tours for adventurous people.',
};

type Tour = {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  location: string;
  date: string;
  stops: number;
  people: number;
  price: number;
  rating: number;
  ratingsCount: number;
  image: string;
};

// Static data from the original HTML. Replace this with your Express API later.
const tours: Tour[] = [
  {
    id: 1,
    name: 'The Forest Hiker',
    subtitle: 'Easy 5-day tour',
    description: 'Breathtaking hike through the Canadian Banff National Park',
    location: 'Banff, Canada',
    date: 'April 2021',
    stops: 3,
    people: 25,
    price: 297,
    rating: 4.9,
    ratingsCount: 21,
    image: '/img/tours/tour-1-1.jpg',
  },
  {
    id: 2,
    name: 'The Sea Explorer',
    subtitle: 'Medium-difficult 7-day tour',
    description: 'Exploring the jaw-dropping US east coast by foot and by boat',
    location: 'Oregon, US',
    date: 'June 2021',
    stops: 4,
    people: 15,
    price: 497,
    rating: 4.8,
    ratingsCount: 12,
    image: '/img/tours/tour-2-cover.jpg',
  },
  {
    id: 3,
    name: 'The Snow Adventurer',
    subtitle: 'Difficult 3-day tour',
    description: 'Exciting adventure in the snow with snowboarding and skiing',
    location: 'Aspen, USA',
    date: 'January 2022',
    stops: 2,
    people: 10,
    price: 697,
    rating: 4.9,
    ratingsCount: 7,
    image: '/img/tours/tour-3-cover.jpg',
  },
  {
    id: 4,
    name: 'The City Wanderer',
    subtitle: 'Easy 7-day tour',
    description:
      "Living the life of Wanderlust in the US' most beatiful cities",
    location: 'NYC, USA',
    date: 'March 2021',
    stops: 3,
    people: 20,
    price: 997,
    rating: 4.8,
    ratingsCount: 31,
    image: '/img/tours/tour-4-cover.jpg',
  },
  {
    id: 5,
    name: 'The Park Camper',
    subtitle: 'Medium-Difficult 10-day tour',
    description:
      "Breathing in Nature in America's most spectacular National Parks",
    location: 'Las Vegas, USA',
    date: 'August 2021',
    stops: 4,
    people: 15,
    price: 1497,
    rating: 4.9,
    ratingsCount: 19,
    image: '/img/tours/tour-5-cover.jpg',
  },
  {
    id: 6,
    name: 'The Sports Lover',
    subtitle: 'Difficult 14-day tour',
    description:
      'Surfing, skating, parajumping, rock climbing and more, all in one tour',
    location: 'California, USA',
    date: 'July 2021',
    stops: 5,
    people: 8,
    price: 1997,
    rating: 4.7,
    ratingsCount: 23,
    image: '/img/tours/tour-6-cover.jpg',
  },
];

type IconName = 'map-pin' | 'calendar' | 'flag' | 'user' | 'search';

function Icon({
  name,
  className = 'card__icon',
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`/img/icons.svg#icon-${name}`} />
    </svg>
  );
}

function Header() {
  return (
    <header className="header">
      <nav className="nav nav--tours">
        <Link href="/overview" className="nav__el">
          All tours
        </Link>
        {/* Visual search only: connect it to search logic when your API is ready. */}
        <form
          className="nav__search"
          action="/overview"
          method="get"
          role="search"
        >
          <button
            className="nav__search-btn"
            type="submit"
            aria-label="Search tours"
          >
            <Icon name="search" className="nav__search-icon" />
          </button>
          <input
            type="search"
            name="search"
            placeholder="Search tours"
            className="nav__search-input"
          />
        </form>
      </nav>

      <div className="header__logo">
        <Image
          src="/img/logo-white.png"
          alt="Natours logo"
          width={130}
          height={40}
        />
      </div>

      <nav className="nav nav--user">
        <a href="#" className="nav__el">
          My bookings
        </a>
        <a href="#" className="nav__el">
          <Image
            src="/img/users/user-1.jpg"
            alt="User photo"
            width={40}
            height={40}
            className="nav__user-img"
          />
          <span>Jonas</span>
        </a>
      </nav>
    </header>
  );
}

function TourCard({ tour }: { tour: Tour }) {
  return (
    <article className="card">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay" aria-hidden="true" />
          <Image
            src={tour.image}
            alt={tour.name}
            width={900}
            height={600}
            className="card__picture-img"
          />
        </div>
        <h3 className="heading-tertirary">
          <span>{tour.name}</span>
        </h3>
      </div>

      <div className="card__details">
        <h4 className="card__sub-heading">{tour.subtitle}</h4>
        <p className="card__text">{tour.description}</p>

        <div className="card__data">
          <Icon name="map-pin" />
          <span>{tour.location}</span>
        </div>
        <div className="card__data">
          <Icon name="calendar" />
          <span>{tour.date}</span>
        </div>
        <div className="card__data">
          <Icon name="flag" />
          <span>{tour.stops} stops</span>
        </div>
        <div className="card__data">
          <Icon name="user" />
          <span>{tour.people} people</span>
        </div>
      </div>

      <div className="card__footer">
        <p>
          <span className="card__footer-value">
            ${tour.price.toLocaleString('en-US')}
          </span>
          <span className="card__footer-text">per person</span>
        </p>
        <p className="card__ratings">
          <span className="card__footer-value">{tour.rating}</span>
          <span className="card__footer-text">
            rating ({tour.ratingsCount})
          </span>
        </p>
        {/* Replace # when the tour detail route is implemented. */}
        <a href="#" className="btn btn--green btn--small">
          Details
        </a>
      </div>
    </article>
  );
}

function Footer() {
  const links = [
    'About us',
    'Download apps',
    'Become a guide',
    'Careers',
    'Contact',
  ];
  return (
    <footer className="footer">
      <div className="footer__logo">
        <Image
          src="/img/logo-green.png"
          alt="Natours logo"
          width={160}
          height={55}
        />
      </div>
      <ul className="footer__nav">
        {links.map((label) => (
          <li key={label}>
            <a href="#">{label}</a>
          </li>
        ))}
      </ul>
      <p className="footer__copyright">
        © by Jonas Schmedtmann. All rights reserved.
      </p>
    </footer>
  );
}

export default function Overview() {
  return (
    <>
      <Header />
      <main className="main">
        <div className="card-container">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
