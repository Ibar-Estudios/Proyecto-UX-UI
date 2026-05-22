import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Research from "./ux-sections/Research";
import Planteamiento from "./ux-sections/Planteamiento";
import UserPersona from "./ux-sections/UserPersona";
import Encuestas from "./ux-sections/Encuestas";
import Entrevistas from "./ux-sections/Entrevistas";
import EmpatiaMapa from "./ux-sections/EmpatiaMapa";
import UserJourney from "./ux-sections/UserJourney";
import PointOfView from "./ux-sections/PointOfView";
import Storytelling from "./ux-sections/Storytelling";
import Storyboard from "./ux-sections/Storyboard";
import Benchmarking from './ux-sections/Benchmarking';
import CardSorting from "./ux-sections/Cardsorting";
import Dendrograma_Matriz from "./ux-sections/Dendrograma&matriz";
import MapaDeSitio from "./ux-sections/MapaDeSitio";
import TaskFlow from "./ux-sections/TaskFlow";
import UserFlow from "./ux-sections/UserFlow";
import Header from "./Header";
import Footer from "./Footer";
import SectionsNav from "./SectionsNav";

axios.defaults.baseURL = "http://localhost:5000/api";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
        {/* Sidebar FIJA - No scroll */}
        <div className="w-80 bg-white/60 backdrop-blur-sm border-r border-slate-200 shadow-lg sticky top-0 h-screen overflow-hidden lg:block hidden z-40">
          <SectionsNav />
        </div>

        {/* Main Content - Scroll independiente */}
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />

          <main className="flex-1 overflow-y-auto px-8 py-12 lg:pl-0 lg:pr-8">
            {/* Padding izquierdo compensa navbar */}
            <div className="max-w-6xl mx-auto pl-0 lg:pl-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/research" element={<Research />} />
                <Route path="/planteamiento" element={<Planteamiento />} />
                <Route path="/user-persona" element={<UserPersona />} />
                <Route path="/encuestas" element={<Encuestas />} />
                <Route path="/entrevistas" element={<Entrevistas />} />
                <Route path="/mapa-empatia" element={<EmpatiaMapa />} />
                <Route path="/user-journey" element={<UserJourney />} />
                <Route path="/PointOfView" element={<PointOfView />} />
                <Route path="/storytelling" element={<Storytelling />} />
                <Route path="/storyboard" element={<Storyboard />} />
                <Route path="/benchmarking" element={<Benchmarking />} />
                <Route path="/cardsorting" element={<CardSorting />} />
                <Route path="/dendrograma&matriz" element={<Dendrograma_Matriz />} />
                <Route path="/mapadesitio" element={<MapaDeSitio />} />
                <Route path="/taskflow" element={<TaskFlow />} />
                <Route path="/userflow" element={<UserFlow />} />
              </Routes>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </Router>
  );
}

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-16 text-center">
    {/* Badge superior */}
    <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-600 text-sm font-semibold px-4 py-2 rounded-full mb-10 shadow-sm">
      <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
      Proyecto Integrador — Diseño UX
    </div>

    {/* Título principal */}
    <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight mb-6 max-w-4xl">
      Un proceso{" "}
      <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
        UX completo
      </span>{" "}
      para entender por qué fallamos en la ejecución.
    </h1>

    {/* Línea separadora */}
    <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-8" />

    {/* Descripción */}
    <p className="text-lg lg:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-6">
      Investigamos a fondo por qué los jóvenes que planifican su día igual no
      logran cumplirlo — y diseñamos la solución desde la empatía y los datos
      reales.
    </p>

    {/* Protagonista */}
    <p className="text-base text-slate-400 mb-14 italic">
      "No hay algo que me diga: estás en tiempo crítico." — Francisco,
      entrevistado
    </p>

    {/* Etapas en pills */}
    <div className="flex flex-wrap justify-center gap-2 mb-14 max-w-3xl">
      {[
        { n: "01", label: "Research" },
        { n: "02", label: "Planteamiento" },
        { n: "03", label: "User Persona" },
        { n: "04", label: "Encuestas" },
        { n: "05", label: "Entrevistas" },
        { n: "06", label: "Mapa de Empatía" },
        { n: "07", label: "User Journey" },
        { n: "08", label: "Point of View" },
        { n: "09", label: "Storytelling" },
        { n: "10", label: "Storyboard" },
        { n: "11", label: "Benchmarking" },
        { n: "12", label: "CardSorting" },
        { n: "13", label: "Dendrograma y Matriz de Similitud" },
        { n: "14", label: "Mapa de Sitio" },
        { n: "15", label: "Task Flow" },
        { n: "16", label: "User Flow" },
      ].map(({ n, label }) => (
        <span
          key={n}
          className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 text-sm font-medium px-3 py-1.5 rounded-full shadow-sm"
        >
          <span className="text-indigo-400 font-bold text-xs">{n}</span>
          {label}
        </span>
      ))}
    </div>

    {/* CTA */}
    <Link
      to="/research"
      className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
    >
      🚀 Ver el proceso completo
    </Link>
  </div>
);

export default App;
