# El Conservatorio Maestre Arco

**Pitch:** Por cada genio musical que la historia nos ha permitido conocer, ¿cuántos talentos se han quedado en silencio por falta de un mentor? Maestre Arco no es una aplicación; es el primer conservatorio digital del mundo con un mentor de IA en su corazón, construido para devolver la voz a los artistas silenciados.

## ✨ Visión

El Conservatorio Maestre Arco es una revolucionaria Aplicación Web Progresiva (PWA) diseñada para democratizar el acceso a educación musical y artística de clase mundial. Utiliza una sofisticada arquitectura de IA híbrida para proporcionar feedback personalizado y en tiempo real, haciendo que la mentoría experta sea accesible para todos, en cualquier lugar. Nuestra misión es derribar las barreras económicas y geográficas que históricamente han limitado la educación artística.

## 🚀 Características Clave (Las Salas del Conservatorio)

La experiencia de usuario está estructurada como un viaje a través de "salas" interconectadas y con un propósito específico:

1.  **Inscripción y Plan Personalizado:** Al ingresar, los estudiantes participan en un diagnóstico conversacional. **Gemini 2.5 Pro** crea entonces un plan de estudios único de 10 módulos en formato JSON estructurado, adaptado a la experiencia, intereses y objetivos del estudiante.

2.  **Laboratorio de Extensiones:** Inmediatamente después del registro, los estudiantes son empoderados. Se les educa sobre las 7 APIs de IA integradas de Chrome y pueden generar y descargar una Extensión de Chrome completamente funcional impulsada por **Gemini Nano**. Esto proporciona un asistente de IA en el dispositivo, demostrando nuestro compromiso con la transparencia y el empoderamiento tecnológico desde el primer día.

3.  **Sala de Práctica (Feedback Multimodal):** Los estudiantes pueden grabar un video (máx. 60s) de su sesión de práctica. **Gemini 2.5 Pro** realiza un análisis multimodal tanto del **video** (postura, técnica) como del **audio** (afinación, ritmo) para ofrecer un feedback completo y de nivel experto.

4.  **Aula Magna (Evaluación Conversacional en Vivo):** Las evaluaciones formales se transforman en conversaciones de audio bidireccionales en tiempo real con Maestre Arco, impulsadas por la **API Gemini Live**. Esto elimina la naturaleza fría e impersonal de los exámenes en línea, creando una experiencia de mentoría similar a la humana.

5.  **Salón del Conocimiento (Investigación Aumentada):** Una interfaz de chat conversacional donde los estudiantes pueden hacer preguntas complejas sobre teoría, historia o arte. **Gemini 2.5 Flash con Google Search Grounding** actúa como un curador experto, consultando la web, sintetizando la información y, crucialmente, **citando sus fuentes**.

## 🏗️ Arquitectura Técnica: El Ecosistema de IA Híbrido

Maestre Arco es una implementación de libro de texto de la arquitectura de IA híbrida promovida por el Desafío de IA de Google Chrome.

*   **Capa Nube (PWA):** Aprovecha toda la potencia de los modelos en la nube de Google para tareas de "pensamiento profundo" que requieren un procesamiento masivo y conocimiento global.
    *   **Modelos Utilizados:** `Gemini 2.5 Pro`, `Gemini 2.5 Flash`, `API Gemini Live`.
*   **Capa Dispositivo (Extensión de Chrome):** Utiliza el modelo en el dispositivo **Gemini Nano** a través de las APIs de IA integradas de Chrome (`window.ai`). Esto maneja tareas rápidas, privadas y sin conexión, según se genera y explica en el Laboratorio de Extensiones.

## 🏆 Alineación con el Desafío de IA de Google Chrome 2025

Este proyecto está meticulosamente diseñado para encarnar el espíritu del desafío:

*   **Útil y Potente:** Resuelve un problema real y profundo en la educación.
*   **Integración Fluida:** Demuestra un dominio de todo el ecosistema Gemini y de las nuevas APIs de IA integradas de Chrome.
*   **Experiencia de Usuario Excepcional:** El viaje es intuitivo, empoderador y emocionalmente resonante.
*   **Transparencia y Empoderamiento:** El Laboratorio de Extensiones es una característica única que no solo utiliza las APIs en el dispositivo, sino que educa al usuario sobre ellas y le entrega el código, alineándose perfectamente con el principio de democratizar la tecnología.

## 🛠️ Instalación y Ejecución de la Aplicación

1.  **Clona el repositorio.**
2.  **Configura tu Clave de API:** La aplicación requiere una clave de API de Google AI. Debes configurarla como una variable de entorno llamada `API_KEY`.
    ```
    # En la configuración de tu entorno de desarrollo (archivo .env, etc.)
    API_KEY="TU_CLAVE_DE_API_DE_GOOGLE_AI"
    ```
3.  **Ejecuta la aplicación:** Abre `index.html` en un navegador web moderno que soporte las APIs web necesarias (como Google Chrome).

---
*Este proyecto es nuestra respuesta a la democratización de la maestría.*