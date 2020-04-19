import React from "react"

import ImageAttribution from "react-image-attribution"

const App = () => {
    return (
        <div>
            <ImageAttribution
                src="https://www.pixsy.com/wp-content/uploads/2018/03/Winter-in-town-David-J-CC-BY-2.0.jpg"
                title="Winter in town"
                author="David J"
                source="Flickr"
                license="CC BY 2.0"
                titleLink="https://www.flickr.com/photos/sebilden/40512726042/"
                authorLink="https://www.flickr.com/photos/sebilden/"
                sourceLink="https://www.flickr.com"
                licenseLink="https://creativecommons.org/licenses/by/2.0/"
                mode="outside"
            />
            <ImageAttribution
                src="https://www.pixsy.com/wp-content/uploads/2018/03/Winter-in-town-David-J-CC-BY-2.0.jpg"
                title="Winter in town"
                author="David J"
                license="CC BY 2.0"
                mode="hidden"
            />
            <ImageAttribution
                src="https://www.pixsy.com/wp-content/uploads/2018/03/Winter-in-town-David-J-CC-BY-2.0.jpg"
                title="Winter in town"
                author="David J"
                license="CC BY 2.0"
                titleLink="https://www.flickr.com/photos/sebilden/40512726042/"
                position="bottomright"
            />
        </div>
    );
}

export default App
