import React from 'react';
import Mobile from './mobileInterface';
import Desktop from './desktopInterface';
/**
* @return {object} something
*/
const winDims = () => ({
  height: window.innerHeight,
  width: window.innerWidth,
});
let screenWidth = window.innerWidth;

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  const [currentUser, setUser] = React.useState('');
  const [bearToken, setToken] = React.useState('');
  const [shouldReload, setReload] = React.useState(true);
  const [shouldReloadCate, setReloadCate] = React.useState(true);
  const [searching, setSearching] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [subcategory, setSubCategory] = React.useState('');
  const [subcategoryOptions, setSubCategoryOptions] = React.useState([]);
  const [postOpen, setPostOpen] = React.useState(false);
  const [isMobileMode, setMobileMode] = React.useState(
    winDims().width < 600? true : false);
  React.useEffect(() => {
    const handleResize = () => {
      screenWidth = winDims().width;
      if (screenWidth < 600) { // should be mobile but not
        setMobileMode(true);
        setReload(true);
        setReloadCate(true);
      } else {
        setMobileMode(false);
        setReload(true);
        setReloadCate(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // if (isMobileMode) {
  // if (isMobileMode) {
  //   console.log('nothing');
  // }
  if (isMobileMode) {
    return (
      <Mobile currentUser = {currentUser} setUser = {setUser}
        shouldReload = {shouldReload} setReload = {setReload}
        shouldReloadCate = {shouldReloadCate} setReloadCate = {setReloadCate}
        searching = {searching} setSearching = {setSearching}
        category = {category} setCategory = {setCategory}
        sub = {subcategory} setSub = {setSubCategory}
        subs = {subcategoryOptions} setSubs = {setSubCategoryOptions}
        postOpen = {postOpen} setPostOpen = {setPostOpen}
        bearToken = {bearToken} setToken = {setToken}/>
    );
  } else {
    return (
      <Desktop currentUser = {currentUser} setUser = {setUser}
        shouldReload = {shouldReload} setReload = {setReload}
        shouldReloadCate = {shouldReloadCate} setReloadCate = {setReloadCate}
        searching = {searching} setSearching = {setSearching}
        category = {category} setCategory = {setCategory}
        sub = {subcategory} setSub = {setSubCategory}
        subs = {subcategoryOptions} setSubs = {setSubCategoryOptions}
        postOpen = {postOpen} setPostOpen = {setPostOpen}
        bearToken = {bearToken} setToken = {setToken}/>
    );
  }
}

export default App;
