import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Banner from './Banner';
import Navigation from './Navigation';
import Wizard from './Wizard';
import Details from './Details';
import Footer from './Footer';
import Costs from './Costs';
import People from './People';
import Summary from './Summary';
import Quantities from './Quantities';
import './my-sass.scss';
import { FormProvider } from './FormContext';

function App() {
  return (
    <FormProvider>
      <Router basename="/paymentitems">
        <div className="App">
          <Header />
          <Banner />
          <Navigation />
          <Wizard />
          <Routes>
            <Route path="/details" element={<Details />} />
            <Route path="/quantities" element={<Quantities />} />
            <Route path="/costs" element={<Costs />} />
            <Route path="/people" element={<People />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/" element={<Details />} /> {/* Default route */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </FormProvider>
  );
}

export default App;
