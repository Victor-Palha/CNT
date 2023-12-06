import { useState, useEffect } from "react";

const ex = `// QuantumFlux Data Integration Protocol initialization
cyberVar quantumFluxStream
\t
// NeuroCortex Hyperthreading Mechanism activation
activateNeuroThread(NCHM)
\t
// SynthoKinetic Quantum Encryption Algorithm key generation
generateEncryptionKey(SKQEA)
\t
// DigiSpectra Holo-Quantum Framework initialization
initializeHoloQuantumFramework(DSHQF)
\t
// NanoNeural Quantum Resonance Processor boot-up
bootNanoNeuralProcessor(NNQRP)
\t
// CyberGenomic Quantum Biometrics scan
userIdentity = scanQuantumBiometrics(CGQB)
\t
// QuantumSpatial Temporal Harmonization Module synchronization
synchronizeTemporalHarmony(QSTHM)
\t
// MegaQuark Quantum Neural Fabric activation
activateMegaQuarkFabric(MQQNF)
\t
// NanoChrono Quantum Entanglement Synchronization start
startQuantumEntanglementSynchronization(NCQES)
\t
// Displaying a futuristic greeting message
consoleFutur("Greetings, denizens of the quantum realm! The megaquarks resonate, and the holo-quantum framework echoes: Hello, World!")
`;

export function CodeWriter() {
  const text = ex;
  const [code, setCode] = useState("");

  function writeCode(text: string, c = 0) {
    if (c < text.length) {
      setCode(text.slice(0, c + 1));

      setTimeout(() => {
        writeCode(text, c + 1);
      }, 40);
    }
  }

  useEffect(() => {
    writeCode(text);
  }, []);

  return (
      <code
        className="text-[16px] code-block cyber-glitch-2"
        data-title="CNT"
        style={{ whiteSpace: "pre-line" }}
      >
        {code}
      </code>
  );
}
