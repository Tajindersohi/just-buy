import { createApi } from 'unsplash-js';
import fetch from 'node-fetch';

const unsplash = createApi({
  accessKey: 'ba5gmqa2-WnYo0WHCwmEG7CtZj1s-BsM77gyDyAIlIo',
  fetch
});

export const getImage = async (query) => {
    try {
      const result = await unsplash.search.getPhotos({
        query,
        page: 1,
        perPage: 1,
        orientation: 'landscape'
      });
  
      console.log(`🔍 Query: ${query}`);
      console.log('📸 Unsplash result:', result);
  
      const image = result?.response?.results?.[0]?.urls?.small;
      return image || 'https://via.placeholder.com/400x300?text=No+Image';
    } catch (err) {
      console.error(`❌ Error fetching image for "${query}":`, err.message);
      return 'https://via.placeholder.com/400x300?text=Error';
    }
  };
