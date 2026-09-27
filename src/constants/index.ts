import brand from './common/brand.json';
import common from './common/common.json';
import notFound from './common/notFound.json';
import header from './layout/header.json';
import footer from './layout/footer.json';
import banner from './home/banner.json';
import categories from './home/categories.json';
import latestProducts from './home/latestProducts.json';
import products from './products/products.json';
import product from './product/product.json';
import productDetail from './product/productDetail.json';
import cart from './cart/cart.json';

export const CONTENT = {
  brand,
  common,
  notFound,
  header,
  footer,
  home: {
    banner,
    categories,
    latestProducts
  },
  products,
  product,
  productDetail,
  cart
};
