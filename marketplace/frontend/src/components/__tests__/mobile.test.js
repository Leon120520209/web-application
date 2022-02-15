import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import '@testing-library/jest-dom';
import {getOnlyVisible, getClickable, setNarrow}
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
  rest.get(url, (req, res, ctx) => {
    return res(ctx.json([{'id': '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      'name': 'coat',
      'price': '$400',
      'longitude': '17.98765',
      'latitude': '-4.87654',
      'img_url': 'https://robohash.org/earumnonfacilis.png?size=50x50&set=set1',
      'category': 'Apparel',
      'create_user': 'King',
      'create_time': '2021-12-04T01:06:09.753Z',
      'replies': '',
      'subcategory': 'Casual'},
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

test('Mobile Categories Visible', async () => {
  render(<App />);
  setNarrow();
  fireEvent.click(getClickable('category'));
  getOnlyVisible('Categories');
});

test('Mobile Vehicles Check', async () => {
  render(<App />);
  setNarrow();
  fireEvent.click(await waitFor(() => screen.getByTestId('area3')));
  fireEvent.click(await waitFor(() => screen.getByTestId('cate1')));
  fireEvent.click(await waitFor(() => screen.getByText('Coupe')));
  // fireEvent.click(await waitFor(() => screen.getByTestId('area7')));
  fireEvent.click(await waitFor(() => getClickable('category')));
  const inputEl = await waitFor(() => screen.getByTestId('cate1'));
  fireEvent.click(inputEl);
  const inputEle = await waitFor(() => screen.getByText('Sedan'));
  fireEvent.click(inputEle);
});

test('Mobile Apparel Check', async () => {
  render(<App />);
  setNarrow();
  fireEvent.click(await waitFor(() => getClickable('category')));
  fireEvent.click(await waitFor(() => screen.getByTestId('cate2')));
});

test('Mobile Family Check', async () => {
  render(<App />);
  setNarrow();
  fireEvent.click(await waitFor(() => getClickable('category')));
  fireEvent.click(await waitFor(() => screen.getByTestId('cate3')));
});

test('Mobile Electronics Check', async () => {
  render(<App />);
  setNarrow();
  fireEvent.click(await waitFor(() => getClickable('category')));
  fireEvent.click(await waitFor(() => screen.getByTestId('cate4')));
});

test('Mobile Entertainment Check', async () => {
  render(<App />);
  setNarrow();
  fireEvent.click(await waitFor(() => getClickable('category')));
  fireEvent.click(await waitFor(() => screen.getByTestId('cate5')));
});

test('Mobile Hobbies Check', async () => {
  render(<App />);
  setNarrow();
  fireEvent.click(await waitFor(() => getClickable('category')));
  fireEvent.click(await waitFor(() => screen.getByTestId('cate6')));
});

test('Mobile Reset Clickable', async () => {
  render(<App />);
  setNarrow();
  fireEvent.click(await waitFor(() => getClickable('category')));
  const inputEl = await waitFor(() => screen.getByTestId('cate7'));
  fireEvent.click(inputEl);
});

test('Mobile Title Visible', async () => {
  render(<App />);
  setNarrow();
  getOnlyVisible('FacepalmBook');
});

test('Mobile P Clickable', async () => {
  render(<App />);
  setNarrow();
  getClickable('p');
});

test('Mobile POST Clickable', async () => {
  render(<App />);
  setNarrow();
  getClickable('post');
});

test('Mobile SEARCH Clickable', async () => {
  render(<App />);
  setNarrow();
  getClickable('search');
});

test('Mobile LOGIN Clickable', async () => {
  render(<App />);
  setNarrow();
  getClickable('login');
});

test('Mobile Search Input', async () => {
  render(<App />);
  setNarrow();
  const inputEl = screen.getByTestId('area4');
  expect(inputEl).toBeInTheDocument();
});

test('Mobile pass input to input field', async () => {
  render(<App />);
  setNarrow();
  const inputEl = screen.getByTestId('area4');
  userEvent.type(inputEl, 'abc');
  fireEvent.click(getClickable('search'));
});

test('Mobile Post Use', async () => {
  render(<App />);
  setNarrow();
  fireEvent.click(getOnlyVisible('Post'));
  const inputEl = screen.getByTestId('post1');
  userEvent.type(inputEl, 'hammer');
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

test('Mobile Post Close Use', async () => {
  render(<App />);
  setNarrow();
  fireEvent.click(getOnlyVisible('Post'));
  const ele = screen.getByTestId('post close');
  fireEvent.click(ele);
  // getNotVisible('Name');
  // getNotVisible('Price');
  // getNotVisible('Category');
});
