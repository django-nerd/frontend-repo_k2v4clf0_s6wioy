import { useState } from 'react'
import Spline from '@splinetool/react-spline'

function App() {
  const [copied, setCopied] = useState(false)

  const promptBlueprint = `Instructions for the Other AI:\n\nHello. I need your help with a complex, multi-stage project to convert a 2D photo into a dimensioned 3D technical drawing. Please act as my expert technical assistant. We will work through this step-by-step.\n\nMy Ultimate Goal: To generate a technical drawing with dimensions from a normal photograph.\n\nI understand this is not a single-click process and involves several challenging stages. I need you to guide me through the entire workflow, providing detailed instructions, recommending specific software/tools (both AI-based and traditional), and helping me troubleshoot.\n\nHere is the proposed workflow we should follow. Please acknowledge you understand and are ready to proceed step-by-step.\n\nProject Workflow:\n\nStage 1: Image Preparation\n\n· Task: Optimize the source photo for 3D reconstruction.\n· What I need from you: Guidelines on how to take a good photo (lighting, angle, background) or how to edit an existing photo (contrast, removing background) to make the next stages easier.\n\nStage 2: 3D Model Generation from a Single Image\n\n· Task: Create a 3D mesh or model from the prepared 2D image.\n· What I need from you:\n  1. Recommend the best available AI tools for this (e.g., Nvidia's Get3D, Tripo.ai, CSM, NeRF-based tools, etc.). Please consider free/accessible options.\n  2. Provide a step-by-step guide on how to use your top recommended tool.\n  3. Explain the expected output format (e.g., .obj, .stl, .glb) and why it matters.\n\nStage 3: 3D Model Scaling and Calibration\n\n· Task: This is a critical step. The AI-generated 3D model will not have real-world scale. I need to assign accurate dimensions to it.\n· What I need from you:\n  1. Explain methods for scaling. (e.g., \"If you know the length of one real-world object in the photo, you can scale the entire model to match\").\n  2. Recommend software where this can be done (e.g., Blender, MeshMixer, Fusion 360).\n  3. Provide a basic tutorial on how to scale a model in your recommended software.\n\nStage 4: Technical Drawing Generation\n\n· Task: Convert the scaled, accurate 3D model into a 2D technical drawing with orthographic views.\n· What I need from you:\n  1. Recommend professional CAD software that can do this (e.g., Autodesk Fusion 360, SolidWorks, Onshape, FreeCAD).\n  2. Guide me on how to import the 3D model and use the software's \"Drawing\" workspace to create Front, Top, and Side views.\n\nStage 5: Dimensioning and Annotation\n\n· Task: Add accurate dimensions, center lines, and notes to the technical drawing views.\n· What I need from you: A step-by-step guide on how to use the dimensioning tools in the CAD software from the previous step to properly annotate the drawing.\n\nLet's begin. Please confirm you understand this workflow. I will start by providing you with a description of the photo I have, or I will ask you questions related to Stage 1. Let's proceed methodically.\n\nImportant Real-World Considerations (For You, The User)\n\n1. The \"Single-View\" Problem: A single 2D photo lacks depth information. AI tools have to guess the 3D shape, which can be imperfect, especially for complex geometries or with poor lighting.\n2. Scale Ambiguity: As mentioned, the initial 3D model will be unscaled. You must provide a known reference measurement (e.g., \"the base of the object is 10cm wide\") to make the final dimensions accurate.\n3. Toolchain Complexity: This process involves multiple different software tools. Be prepared for a learning curve, especially with 3D modeling and CAD software like Blender or Fusion 360.\n4. Limitations: This workflow is best for relatively simple, man-made objects with clear geometries. It is very difficult to do with organic shapes (like a person's face) or very complex machinery from a single photo.`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(promptBlueprint)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.error('Copy failed', e)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero with Spline cover background */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/tu1yYfmgsnYCLUIx/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        {/* Gradient overlay for readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/40 to-slate-900"></div>

        <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col items-start justify-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-100 px-3 py-1 rounded-full text-xs mb-4">
            Photo → 3D Model → Dimensioned Drawing
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-sm">
            Photo to 3D Technical Drawing Converter
          </h1>
          <p className="mt-4 text-blue-100/90 max-w-2xl">
            A clear, step-by-step blueprint to turn a single photograph into a scaled 3D model and export a professional, dimensioned drawing.
          </p>
        </div>
      </section>

      {/* Workflow overview */}
      <section className="relative max-w-6xl mx-auto px-6 -mt-12">
        <div className="grid md:grid-cols-5 gap-4">
          {[
            { n: '1', t: 'Image Prep', d: 'Optimize lighting, angle, and background.' },
            { n: '2', t: '3D Generation', d: 'Use AI tools to create a mesh from one image.' },
            { n: '3', t: 'Scaling', d: 'Calibrate to real-world units using a known length.' },
            { n: '4', t: 'Drawing', d: 'Create orthographic views in a CAD workspace.' },
            { n: '5', t: 'Dimensions', d: 'Add sizes, centerlines, and notes.' },
          ].map((s) => (
            <div key={s.n} className="bg-slate-800/70 border border-slate-700 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-400/30 flex items-center justify-center font-bold text-blue-200">
                  {s.n}
                </span>
                <div>
                  <p className="font-semibold">{s.t}</p>
                  <p className="text-sm text-blue-200/80">{s.d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Copyable prompt blueprint */}
      <section className="max-w-6xl mx-auto px-6 mt-12">
        <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold">Blueprint for Speaking with Another AI</h2>
            <button onClick={copyToClipboard} className="shrink-0 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-colors px-4 py-2 rounded-lg">
              {copied ? 'Copied' : 'Copy Blueprint'}
            </button>
          </div>
          <p className="text-blue-200/90 mb-4">Copy this text and paste it into your preferred AI to get guided, step-by-step assistance.</p>
          <div className="bg-slate-900/70 border border-slate-700 rounded-xl overflow-hidden">
            <textarea
              readOnly
              value={promptBlueprint}
              className="w-full h-[360px] p-4 font-mono text-sm bg-transparent outline-none resize-none text-blue-100"
            />
          </div>
        </div>
      </section>

      {/* Practical guidance */}
      <section className="max-w-6xl mx-auto px-6 mt-12 grid md:grid-cols-2 gap-6">
        <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-3">Practical Tips for Stage 1</h3>
          <ul className="space-y-2 text-blue-200/90 list-disc pl-5">
            <li>Use diffuse lighting; avoid strong shadows and specular highlights.</li>
            <li>Shoot against a plain background; place the object fully in frame.</li>
            <li>Capture the object as orthogonal as possible; keep lens center aligned.</li>
            <li>If available, include a ruler or a known-size card for later scaling.</li>
            <li>For editing, remove background and increase contrast slightly.</li>
          </ul>
        </div>
        <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-3">Key Constraints to Keep in Mind</h3>
          <ul className="space-y-2 text-blue-200/90 list-disc pl-5">
            <li>Single-image reconstructions infer depth and can be imperfect.</li>
            <li>Scale must be calibrated from a reference measurement.</li>
            <li>Best results on simple, man-made objects with clear edges.</li>
            <li>Expect a learning curve across AI, DCC, and CAD tools.</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 mt-12 mb-16">
        <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h4 className="text-xl font-semibold">Ready to start?</h4>
            <p className="text-blue-200/90">Begin with Stage 1: tell me about your photo or ask for camera setup guidance.</p>
          </div>
          <a href="/test" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-colors px-4 py-2 rounded-lg">
            Backend test
          </a>
        </div>
      </section>

      <footer className="text-center text-blue-300/70 pb-10">
        Built with an engineering-first blueprint aesthetic.
      </footer>
    </div>
  )
}

export default App
