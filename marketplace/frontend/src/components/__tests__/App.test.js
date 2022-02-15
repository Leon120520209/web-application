import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import '@testing-library/jest-dom';
import {getOnlyVisible, getClickable, getNotVisible, setWide}
from './common';
import App from '../App';

const URL = '/v0/category';
const url = '/v0/listing';
const urlC = '/v0/listing/Vehicles';
const urlCS = '/v0/listing/Vehicles/Sedan';
const urlCSC = '/v0/listing/Vehicles/Coupe';
const urla = '/v0/listing/Apparel';
const urlb = '/v0/listing/Electronics';
const urlc = '/v0/listing/Entertainment';
const urld = '/v0/listing/Family';
const urle = '/v0/listing/Hobbies';

const server = setupServer(
  rest.get(URL, (req, res, ctx) => {
    return res(ctx.json([{name: 'Vehicles', subcategories: {subcategories:
      ['Sedan', 'Coupe']}},
    {name: 'Apparel', subcategories: {subcategories: ['Casual', 'Sports']}},
    ]));
  }),
  rest.get(urlCSC, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.get(urla, (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.get(urlb, (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.get(urlc, (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.get(urld, (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.get(urle, (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.get(url, (req, res, ctx) => {
    return res(ctx.json([{'id': '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      'name': 'coat',
      'price': '$400',
      'longitude': '17.98765',
      'latitude': '-4.87654',
      'img_url': 'https://robohash.org/earumnonfacilis.png?size=50x50&set=set1',
      'category': 'Vehicles',
      'create_user': 'King',
      'create_time': '2021-12-04T01:06:09.753Z',
      'replies': '',
      'subcategory': 'Sedan'},
    ]));
  }),
  rest.get(urlC, (req, res, ctx) => {
    return res(ctx.json([{'id': '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      'name': 'coat',
      'price': '$400',
      'longitude': '17.98765',
      'latitude': '-4.87654',
      'img_url': 'https://robohash.org/earumnonfacilis.png?size=50x50&set=set1',
      'category': 'Vehicles',
      'create_user': 'King',
      'create_time': '2021-12-04T01:06:09.753Z',
      'replies': '',
      'subcategory': 'Sedan'},
    ]));
  }),
  rest.get(urlCS, (req, res, ctx) => {
    return res(ctx.json([{'id': '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      'name': 'coat',
      'price': '$400',
      'longitude': '17.98765',
      'latitude': '-4.87654',
      'img_url': 'https://robohash.org/earumnonfacilis.png?size=50x50&set=set1',
      'category': 'Vehicles',
      'create_user': 'King',
      'create_time': '2021-12-04T01:06:09.753Z',
      'replies': '',
      'subcategory': 'Sedan'},
    ]));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

/**
 */
test('App Renders', async () => {
  render(<App />);
  setWide();
});

test('First Type Search Input', async () => {
  render(<App />);
  setWide();
  const inputEl = screen.getByTestId('area4');
  fireEvent.change(inputEl, {target: {value: 'abc'}});
  fireEvent.click(getClickable('search'));
});

test('Vehicles check', async () => {
  render(<App />);
  setWide();
  fireEvent.click(await waitFor(() => screen.getByTestId('cate1')));
  fireEvent.click(await waitFor(() => screen.getByText('Coupe')));
  const inputEl = await waitFor(() => screen.getByTestId('cate1'));
  fireEvent.click(inputEl);
  const inputElee = await waitFor(() => screen.getByTestId('area8'));
  fireEvent.change(inputElee, {target: {value: 'abc'}});
  const inputEle = await waitFor(() => screen.getByText('Sedan'));
  fireEvent.click(inputEle);
  const inputEleee = await waitFor(() => screen.getByTestId('area12'));
  fireEvent.change(inputEleee, {target: {value: 'abc'}});
  fireEvent.click(getClickable('search'));
});

test('Apparel Check', async () => {
  render(<App />);
  setWide();
  fireEvent.click(await waitFor(() => screen.getByTestId('cate2')));
});

test('Family Check', async () => {
  render(<App />);
  setWide();
  fireEvent.click(await waitFor(() => screen.getByTestId('cate3')));
});

test('Electronics Check', async () => {
  render(<App />);
  setWide();
  fireEvent.click(await waitFor(() => screen.getByTestId('cate4')));
});

test('Entertainment Check', async () => {
  render(<App />);
  setWide();
  fireEvent.click(await waitFor(() => screen.getByTestId('cate5')));
});

test('Hobbies Check', async () => {
  render(<App />);
  setWide();
  fireEvent.click(await waitFor(() => screen.getByTestId('cate6')));
});

test('Reset Clickable', async () => {
  render(<App />);
  setWide();
  const inputEl = await waitFor(() => screen.getByTestId('cate7'));
  fireEvent.click(inputEl);
});

test('Title Visible', async () => {
  render(<App />);
  getOnlyVisible('FacepalmBook');
});

test('Categories Visible', async () => {
  render(<App />);
  getOnlyVisible('Categories');
});

test('POST Clickable', async () => {
  render(<App />);
  getClickable('post');
});

test('SEARCH Clickable', async () => {
  render(<App />);
  getClickable('search');
});

test('LOGIN Clickable', async () => {
  render(<App />);
  getClickable('login');
});

// test('Apparel Clickable', async () => {
//   render(<App />);
//   setWide();
//   const inputEl = await waitFor(() => screen.getByText('Apparel'));
//   fireEvent.click(inputEl);
// });

// test('Electronics Clickable', async () => {
//   render(<App />);
//   setWide();
//   const inputEl = await waitFor(() => screen.getByText('Electronics'));
//   fireEvent.click(inputEl);
// });

// test('Entertainment Clickable', async () => {
//   render(<App />);
//   setWide();
//   const inputEl = await waitFor(() => screen.getByText('Entertainment'));
//   fireEvent.click(inputEl);
// });

// test('Family Clickable', async () => {
//   render(<App />);
//   setWide();
//   const inputEl = await waitFor(() => screen.getByText('Family'));
//   fireEvent.click(inputEl);
// });

// test('Hobbies Clickable', async () => {
//   render(<App />);
//   setWide();
//   const inputEl = await waitFor(() => screen.getByText('Hobbies'));
//   fireEvent.click(inputEl);
// });

test('Search Input', async () => {
  render(<App />);
  setWide();
  const inputEl = screen.getByTestId('area4');
  expect(inputEl).toBeInTheDocument();
});

// test('pass input to input field', async () => {
//   render(<App />);
//   setWide();
//   const inputEl = screen.getByTestId('area4');
//   fireEvent.change(inputEl, {target: {value: 'coat'}});
//   fireEvent.click(getClickable('search'));
// });

test('Post Use', async () => {
  render(<App />);
  fireEvent.click(getOnlyVisible('Post'));
  const inputEl = screen.getByTestId('post1');
  userEvent.type( inputEl, 'hammer');
  // expect(screen.getByTestId("name input")).toHaveValue('hammer');
  const inputEle = screen.getByTestId('post2');
  userEvent.type(inputEle, '1000');
  // expect(screen.getByTestId('price input')).toHaveValue(1000);
  const inputElem = screen.getByTestId('post3');
  userEvent.type(inputElem, 'Electronics');
  // expect(screen.getByTestId('category input')).toHaveValue('Electronics');
  const inputElement = screen.getByTestId('post4');
  userEvent.type(inputElement, 'Power');
  // expect(screen.getByTestId('subcategory input')).toHaveValue('Power');
  fireEvent.click(getOnlyVisible('POST'));
});

test('Post Close Use', async () => {
  render(<App />);
  fireEvent.click(getOnlyVisible('Post'));
  const ele = screen.getByTestId('post close');
  fireEvent.click(ele);
  getNotVisible('Name');
  getNotVisible('Price');
  getNotVisible('Category');
});

// test('Category Vehicles Use', () => {
//   render(<App />);
//   fireEvent.click(getOnlyVisible('Vehicles'));
//   fireEvent.click(getOnlyVisible('SEDAN'));

//   fireEvent.click(getOnlyVisible('Reset'));
//   fireEvent.click(getOnlyVisible('Vehicles'));
//   fireEvent.click(getOnlyVisible('COUPE'));
// });

// test('Category Apparel Use', () => {
//   render(<App />);
//   fireEvent.click(getOnlyVisible('Apparel'));
//   fireEvent.click(getOnlyVisible('CASUAL'));

//   fireEvent.click(getOnlyVisible('Reset'));
//   fireEvent.click(getOnlyVisible('Apparel'));
//   fireEvent.click(getOnlyVisible('SPORTS'));
// });

// test('Category Electronics Use', () => {
//   render(<App />);
//   fireEvent.click(getOnlyVisible('Electronics'));
//   fireEvent.click(getOnlyVisible('DIGITAL'));

//   fireEvent.click(getOnlyVisible('Reset'));
//   fireEvent.click(getOnlyVisible('Electronics'));
//   fireEvent.click(getOnlyVisible('POWER'));
// });

// test('Category Entertainment Use', () => {
//   render(<App />);
//   fireEvent.click(getOnlyVisible('Entertainment'));
//   fireEvent.click(getOnlyVisible('GAMES'));

//   fireEvent.click(getOnlyVisible('Reset'));
//   fireEvent.click(getOnlyVisible('Entertainment'));
//   fireEvent.click(getOnlyVisible('MOVIES'));
// });

// test('Category Family Use', () => {
//   render(<App />);
//   fireEvent.click(getOnlyVisible('Family'));
//   fireEvent.click(getOnlyVisible('KITCHEN'));

//   fireEvent.click(getOnlyVisible('Reset'));
//   fireEvent.click(getOnlyVisible('Family'));
//   fireEvent.click(getOnlyVisible('TRAVEL'));
// });

// test('Category Hobbies Use', () => {
//   render(<App />);
//   fireEvent.click(getOnlyVisible('Hobbies'));
//   fireEvent.click(getOnlyVisible('PLANTING'));

//   fireEvent.click(getOnlyVisible('Reset'));
//   fireEvent.click(getOnlyVisible('Hobbies'));
//   fireEvent.click(getOnlyVisible('CLIMBING'));
// });
