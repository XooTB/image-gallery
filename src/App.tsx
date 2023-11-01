import images from "./constants/images";
import NavBar from "./components/NavBar";
import ImageGallery from "./components/ImageGallery";
import Footer from "./components/Footer";

/**
 * The main component of the Image Gallery app.
 * @returns The App component.
 */

function App() {
  return (
    <div className="">
      <NavBar />
      <main className="px-10">
        <h1 className="py-5 text-center font-semibold text-3xl">
          Welcome to the Image Gallery
        </h1>
        <hr />
        <div>
          <ImageGallery imagesData={images} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
