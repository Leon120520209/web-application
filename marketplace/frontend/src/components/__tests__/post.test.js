import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import '@testing-library/jest-dom';
import {setWide}
from './common';
import App from '../App';

const URL = '/v0/category';
const url = '/v0/listing';
const urlC = '/v0/listing/Vehicles';
const urlCS = '/v0/listing/Vehicles/Sedan';
// const urlCSC = '/v0/userlisting?username=abc';
// const urlCSC = '/v0/userlisting';
const server = setupServer(
  rest.get(URL, (req, res, ctx) => {
    return res(ctx.json([{name: 'Vehicles', subcategories: {subcategories:
        ['Sedan', 'Coupe']}},
    {name: 'Apparel', subcategories: {subcategories: ['Casual', 'Sports']}},
    ]));
  }),
  rest.post(url, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{'id':
    'https://robohash.org/ipsamquaenon.png?size=50x50&set=set1',
    'name': 'pen',
    'price': '$400',
    'longitude': '17.78765',
    'latitude': '-4.87754',
    'img_url': 'https://robohash.org/earumnonfacilis.png?size=50x50&set=set1',
    'category': 'Vehicles',
    'create_user': 'King',
    'create_time': '2021-12-01T01:06:09.753Z',
    'replies': '',
    'subcategory': 'Sedan'}]));
  }),
  //   rest.get('/v0/userlisting', (req, res, ctx) => {
  //     // const query = req.url.searchParams;
  //     // const username = query.get('username');
  //     return res(ctx.json([{'id': '3oa85f64-5717-9999-b3fc-2c963k66afa6',
  //       'name': 'coat',
  //       'price': '$400',
  //       'longitude': '17.98765',
  //       'latitude': '-4.87654',
  //       'img_url': 'https://robohash.org/earumnonfacilis.png?size=50x50&set=set1',
  //       'category': 'Vehicles',
  //       'create_user': 'abc',
  //       'create_time': '2021-12-04T01:06:09.753Z',
  //       'replies': '',
  //       'subcategory': 'Sedan'},
  //     ]));
  //   }),
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

test('Post Fail test', async () => {
  fetch = jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve({
        ok: false,
        json: () => ({
          'name': '',
          'accessToken': '',
        }),
      });
    });
  });
  render(<App />);
  setWide();
  // fireEvent.click(screen.getByText('P'));
  fireEvent.click(screen.getByTestId('area2'));
  fireEvent.click(screen.getByTestId('post'));
});

test('Login success test', async () => {
  fetch = jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve({
        ok: true,
        json: () => ({
          'name': 'abc',
          'accessToken': 'ass',
        }),
      });
    });
  });
  render(<App />);
  setWide();
  fireEvent.click(screen.getByTestId('area2'));
  fireEvent.click(screen.getByTestId('post'));
  fireEvent.click(screen.getByTestId('header1'));
  const inputEl = screen.getByTestId('login1');
  fireEvent.change(inputEl, {target: {value: 'abc@gmail.com'}});
  const inputEle = screen.getByTestId('loginPass1');
  fireEvent.change(inputEle, {target: {value: 'abc'}});
  fireEvent.click(screen.getByTestId('login2'));
  fireEvent.click(await waitFor(() => screen.getByTestId('area1')));
  fireEvent.click(await waitFor(() => screen.getByTestId('area2')));
  fireEvent.click(await waitFor(() => screen.getByTestId('post')));
  fireEvent.click(await waitFor(() => screen.getByTestId('header2')));
  // fireEvent.click(screen.getByTestId('header2'));
});
