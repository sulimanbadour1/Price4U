[![wakatime](https://wakatime.com/badge/user/d7fffb39-631e-454c-9cce-bb60e92d14c5/project/018b2999-77e1-4dcf-9495-40926a3c41a5.svg)](https://wakatime.com/badge/user/d7fffb39-631e-454c-9cce-bb60e92d14c5/project/018b2999-77e1-4dcf-9495-40926a3c41a5)

<img src="https://github.com/sulimanbadour1/Price4U/blob/main/public/assets/sul-src/price4u.png?raw=true" alt ="Price4U logo" width='50px'/>

# Price4U

<img src="https://github.com/sulimanbadour1/Price4U/blob/main/public/screens/demo.gif?raw=true" alt="Banner" width="660px"/>

## Overview

Price4U is an eCommerce price tracker that allows users to monitor product prices across various online platforms.

## Technologies Used

- **Framework**: Next.js 15
- **Library**: React.js
<!-- - **Carousel** : React Responsive Carousel. -->
- **Data Base**: MongoDB.
- **Styling**: Tailwind CSS
- **Web Scraping**: Bright Data
- **Axios & Cheerio**: server funcs.

## Data Model:

# Product Schema

- **url**: String (Required, Unique)
- **currency**: String (Required)
- **image**: String (Required)
- **title**: String (Required)
- **currentPrice**: Number (Required)
- **originalPrice**: Number (Required)

- **priceHistory**: Array of:

  - **prices**: Number (Required)
  - **date**: Date (Default: Date.now)

- **highestPrice**: Number
- **lowestPrice**: Number
- **averagePrice**: Number
- **discountRate**: Number
- **description**: String
- **category**: String
- **reviewsCount**: Number
- **isOutOfStock**: Boolean (Default: False)

- **users**: Array of:

  - **email**: String (Required, Unique)

- **timestamps**: True

## Contribution

Feel free to contribute to Price4U by submitting pull requests or opening issues.

## License

MIT License. See `LICENSE` for more information.
