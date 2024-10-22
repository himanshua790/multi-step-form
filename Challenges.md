## Brief Description of Approach and Challenges Faced

### Approach
The project was built using React and Vite, with a focus on providing a user-friendly and efficient experience for managing a multi-step form. I used React Hook Form for managing form state, ensuring modularity and ease of integration for different components, such as shipping and billing addresses. I also implemented data persistence using IndexedDB (via localforage) to maintain form progress even after a page refresh.

### Challenges Faced

1. **Autocomplete Functionality**: I faced challenges with the autocomplete feature for country and city selection, mainly due to MUI's updated documentation. To resolve this, I referred to updated API documentation and ensured the correct version compatibility for my component.

2. **API Calling for Countries and Cities**: Dynamically fetching country and city data brought its own challenges. There were delays and inconsistencies in retrieving data, particularly due to the latency of third-party APIs. To address this, I implemented debouncing to optimize user input for city searches and caching mechanisms to store fetched country data locally, reducing redundant API calls.

3. **Loading States**: Managing loading states for asynchronous operations, such as fetching countries and cities, was another hurdle. I ensured a smooth user experience by adding clear loading indicators to inform users when data was being fetched.

4. **State Management**: Properly managing the state for selected cities, user inputs, and synchronized billing/shipping addresses was crucial. I utilized `useFormContext` from React Hook Form to centralize form state, and synchronized billing address fields based on a toggle for "same as shipping address."

5. **Validation**: Implementing robust validation for credit card, expiry date, country code, and phone number was critical to maintain data integrity. I used custom regex patterns to validate various fields, ensuring they met format requirements and provided appropriate helper text.

6. **Form State Persistence**: I wanted the form state to be preserved even after a page refresh, which was achieved using IndexedDB. This allowed users to pick up where they left off without losing any progress, ensuring a better user experience.

