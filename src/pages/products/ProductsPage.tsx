import SectionHeader from '@/common/SectionHeader';
import { CONTENT } from '@/constants';

const { eyebrow, title, description } = CONTENT.products;

const ProductsPage = () => (
  <SectionHeader eyebrow={eyebrow} title={title} description={description} />
);

export default ProductsPage;
