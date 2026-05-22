import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// Detecta si una card merece ancho completo por volumen de contenido
function isWideCard(value) {
  if (Array.isArray(value)) {
    const totalChars = value.join("").length;
    return value.length > 6 || totalChars > 300;
  }
  if (typeof value === "string") return value.length > 200;
  return false;
}

function DataCard({ cardKey, value, index }) {
  const wide = isWideCard(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 ${
        wide ? "col-span-full" : ""
      }`}
    >
      <h3 className="text-xl font-bold text-slate-900 mb-5">
        {cardKey}
      </h3>

      {Array.isArray(value) ? (
        <ul className={`${wide ? "space-y-3" : "space-y-2"}`}>
          {value.map((item, i) => {
            // Separadores visuales para las líneas ━━━
            if (typeof item === "string" && item.startsWith("━")) {
              return <li key={i} className="border-t border-slate-200 my-4" />;
            }
            // Labels de sección en negrita (FUENTE 1, COMENTARIO 1, etc.)
            const isLabel =
              typeof item === "string" &&
              (item.startsWith("📄") ||
                item.startsWith("🗨️") ||
                item.startsWith("🧠") ||
                item.startsWith("🔗"));

            const isLink =
              typeof item === "string" && item.startsWith("🔗 http");

            if (isLink) {
              const url = item.replace("🔗 ", "");
              return (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-blue-400">🔗</span>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm hover:text-blue-800 break-all"
                  >
                    {url}
                  </a>
                </li>
              );
            }

            return (
              <li
                key={i}
                className={`flex items-start gap-3 ${
                  isLabel ? "mt-4" : ""
                } text-slate-700`}
              >
                {!isLabel && (
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                )}
                <span
                  className={
                    isLabel
                      ? "font-black text-slate-900 text-base"
                      : "text-sm leading-relaxed"
                  }
                >
                  {item}
                </span>
              </li>
            );
          })}
        </ul>
      ) : typeof value === "object" ? (
        <div className="space-y-3">
          {Object.entries(value).map(([k, v]) => (
            <div key={k} className="p-4 bg-white rounded-xl border-l-4 border-blue-400">
              <div className="font-bold text-slate-900 mb-2 capitalize">{k}:</div>
              {Array.isArray(v) ? (
                <ul className="list-disc ml-6 space-y-1 text-slate-700">
                  {v.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              ) : (
                <span className="font-medium text-slate-800 bg-blue-50 px-3 py-1 rounded-full">
                  {v}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-slate-700 font-medium leading-relaxed">{value}</p>
      )}
    </motion.div>
  );
}

export default function SectionViewer({ sectionName, title, description }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔍 Fetching:", sectionName);
    axios
      .get(`/ux-sections/${sectionName}`)
      .then((res) => {
        console.log("✅ Data:", res.data);
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error:", err.response?.data || err.message);
        setLoading(false);
      });
  }, [sectionName]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent" />
        <p className="text-xl text-gray-600">Cargando {title}...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-12"
    >
      {/* HEADER */}
      <div className="text-center pt-12">
        <h1 className="text-5xl lg:text-7xl font-black text-blue-900  bg-clip-text mb-6">
          {data?.title || title}
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-8" />
        <p className="text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          {data?.description || description}
        </p>
      </div>

      {/* CONTENT HTML */}
      {data?.content && (
        <div className="prose prose-lg lg:prose-xl max-w-none">
          <div
            className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-slate-200/50"
            dangerouslySetInnerHTML={{
              __html: data.content
                .replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong class="text-slate-900 font-black">$1</strong>'
                )
                .replace(/\n\n/g, '</p><p class="mb-8">')
                .replace(/\n/g, "<br>")
                .replace(
                  /^/m,
                  '<p class="mb-8 leading-relaxed text-lg text-slate-800">'
                ),
            }}
          />
        </div>
      )}

      {/* DATA ESTRUCTURADA — grid adaptativo */}
      {data?.data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(data.data).map(([key, value], i) => (
            <DataCard key={key} cardKey={key} value={value} index={i} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
