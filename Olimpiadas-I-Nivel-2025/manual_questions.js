const QUESTIONS=[
  {
    "sourceNumber": 1,
    "lead": "Dana, de 10 años, está jugando con el número 10. Para ello, tiene una caja que contiene 10 bolas blancas, 10 rojas y 10 azules. Cada color de bola produce un efecto especial:",
    "area": "Números y Álgebra",
    "type": "choice",
    "options": [
      "−6",
      "4",
      "9",
      "13"
    ],
    "ask": "Si Dana extrae tres bolas y al menos una es azul, ¿cuál es el valor mínimo que puede obtener al aplicar los efectos de las tres bolas?",
    "pre": "<ul><li>Las bolas blancas suman 1 unidad.</li><li>Las bolas rojas restan 2 unidades.</li><li>Las bolas azules suman 3 unidades.</li></ul><p>El juego consiste en extraer tres bolas de la caja. Se comienza con el número 10 y se aplica el efecto de la primera bola extraída. Luego, al resultado obtenido, se le aplica el efecto de la segunda bola, y finalmente, al nuevo resultado, se le aplica el efecto de la tercera bola.</p><p>Por ejemplo, si Dana extrae tres bolas blancas, sumará 1 unidad tres veces al 10 inicial, obteniendo un total de 13.</p>"
  },
  {
    "sourceNumber": 2,
    "lead": "En una clase de matemática se escriben en la pizarra los números del 1 al 10. Luego, cada estudiante participa en el siguiente juego: una persona borra dos números y escribe en la pizarra el resultado de sumar ambos números y restar 1. Luego pasa otra persona estudiante y hace lo mismo. El juego se repite hasta que queda un único número en la pizarra. ¿Cuál es ese número?",
    "area": "Números y Álgebra",
    "type": "number"
  },
  {
    "sourceNumber": 3,
    "lead": "Dana, Nicole y Sofía han decidido comenzar un plan de ahorro. Cada una de ellas deposita diariamente una cantidad específica de dinero, pero estas cantidades difieren entre sí:",
    "area": "Números y Álgebra",
    "type": "choice",
    "options": [
      "12",
      "17",
      "51",
      "56"
    ],
    "ask": "¿Cuánto ha ahorrado diariamente Sofía?",
    "pre": "<ul><li>Nicole ahorra una cierta cantidad fija cada día.</li><li>Dana ahorra diariamente 5 dólares menos que Nicole.</li><li>Sofía ahorra cada día el triple de lo que ahorra Nicole.</li></ul><p>Las tres comenzaron a ahorrar el mismo día y han mantenido este hábito durante 7 días. Se sabe que, al cabo de este período, Dana ha acumulado un total de 84 dólares.</p>"
  },
  {
    "sourceNumber": 4,
    "lead": "En una misión interestelar, el androide Salomón-X debe activar una consola alienígena compuesta por 16 paneles de energía colocados en una cuadrícula de tamaño 4 × 4. Cada panel puede iluminarse en uno de cuatro colores: rojo (R), azul (A), verde (V) o morado (M). El sistema de seguridad de la nave exige que cada fila y cada columna contenga exactamente un panel de cada color para desbloquear el siguiente nivel de acceso.",
    "area": "Razonamiento lógico",
    "type": "choice",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "fig": "4",
    "ask": "¿Cuántos de los cuatro colores podrían programarse en el panel marcado con el símbolo ★ sin violar las reglas del sistema?",
    "pre": "<p>Después de programar la mayoría de los paneles, queda uno por configurar, marcado con un símbolo estelar ★.</p>"
  },
  {
    "sourceNumber": 5,
    "lead": "Este año, en una maratón participaron más de 800 personas. Al seleccionar al azar a un participante, la probabilidad de que sea mujer es del 35 %. Si se sabe que hubo 252 hombres más que la cantidad de mujeres, ¿cuántas personas participaron en la maratón?",
    "area": "Estadística y Probabilidad",
    "type": "number"
  },
  {
    "sourceNumber": 6,
    "lead": "Se tiene una rueda giratoria dividida en 30 secciones del mismo tamaño, los números del 1 al 30 están distribuidos en estas regiones. Al girarla, la rueda se detiene al azar en una de las secciones. La probabilidad de que el número contenido en la región sea divisor de 30 corresponde a",
    "area": "Estadística y Probabilidad",
    "type": "choice",
    "options": [
      "1/2",
      "3/10",
      "4/15",
      "1/6"
    ]
  },
  {
    "sourceNumber": 7,
    "lead": "Considere los segmentos PQ y QR. Sean S y T puntos en PQ y QR, y X es el punto de intersección de SR y PT, tal y como se muestra en la siguiente figura.",
    "area": "Geometría",
    "type": "number",
    "fig": "7",
    "ask": "Además, m∠PQR = 37°, m∠QPT = 43° y m∠SRQ = 35°. Determine m∠PXR en grados."
  },
  {
    "sourceNumber": 8,
    "lead": "Cierta cantidad de estudiantes se inscribió para participar en la Olimpiada de Matemática, que está compuesta por dos etapas. Se sabe que la prueba de la primera etapa la realizó el 85 % de quienes se inscribieron, y la segunda etapa la realizaron las dos terceras partes de quienes realizaron la primera, que fueron 272 estudiantes. Determine la cantidad de estudiantes que se inscribieron.",
    "area": "Estadística y Probabilidad",
    "type": "choice",
    "options": [
      "72",
      "213",
      "346",
      "480"
    ]
  },
  {
    "sourceNumber": 9,
    "lead": "En la figura ABCD y AEGI son cuadrados. Si el área de ABCD es 49 cm² y el área del rectángulo EBCF es 91 cm². ¿Cuál es la diferencia en centímetros entre el perímetro del cuadrado AEGI y el perímetro del rectángulo HIAB?",
    "area": "Geometría",
    "type": "choice",
    "options": [
      "26",
      "31",
      "54",
      "80"
    ],
    "fig": "9"
  },
  {
    "sourceNumber": 10,
    "lead": "Un número es alegre si tiene cuatro dígitos y, al dividirlo por 2, 3, 5 y 7, se obtiene un residuo de 1. La suma de los dígitos del menor número alegre corresponde a:",
    "area": "Números y Álgebra",
    "type": "choice",
    "options": [
      "5",
      "6",
      "7",
      "8"
    ]
  },
  {
    "sourceNumber": 11,
    "lead": "El número N es el menor número de cuatro dígitos con exactamente tres divisores primos que es divisible por 75 y por 35. La suma de los dígitos de N corresponde a:",
    "area": "Números y Álgebra",
    "type": "choice",
    "options": [
      "6",
      "12",
      "15",
      "18"
    ]
  },
  {
    "sourceNumber": 12,
    "lead": "Una pared se forma utilizando bloques cuadrados y rectangulares, como se muestra en la figura. Las dimensiones de los bloques rectangulares son de 24 cm de largo y 16 cm de ancho. ¿Cuál es el perímetro de la pared?",
    "area": "Geometría",
    "type": "number",
    "fig": "12"
  },
  {
    "sourceNumber": 13,
    "lead": "Sea ABCD un rombo. Sea E un punto, tal que B pertenece al segmento AE y 2BE = AB. Sea F el punto de intersección de las diagonales del rombo. El área de △AFD es 5 cm². Entonces el área del cuadrilátero BFCE corresponde a:",
    "area": "Geometría",
    "type": "number"
  },
  {
    "sourceNumber": 14,
    "lead": "Una hormiga recorre un trayecto desde el punto A hasta el punto B siguiendo la línea continua que se muestra en la figura adjunta. Los cuadriláteros que se forman con el trayecto de la hormiga y la línea punteada son cuadrados.",
    "area": "Geometría",
    "type": "number",
    "fig": "14",
    "ask": "Si la distancia en línea recta desde A hasta B (la línea punteada) es de 38 cm, ¿cuál es la distancia total que recorre la hormiga?"
  },
  {
    "sourceNumber": 15,
    "lead": "Olcoman ha aterrizado en el planeta Cúbiton, donde los habitantes locales han solicitado su ayuda para construir una estatua ceremonial cúbica de forma perfecta en honor a su planeta. Para este propósito, Olcoman cuenta con bloques modulares traídos desde la Tierra, cada uno con dimensiones exactas de 2 × 4 × 6 unidades. Por respeto a las tradiciones cúbitas, los bloques no pueden ser cortados ni modificados, y la estatua debe tener forma de cubo perfecto, sólido y sin huecos.",
    "area": "Geometría",
    "type": "number",
    "ask": "¿Cuál es la menor cantidad de bloques necesarios para construir esta estatua cúbica?"
  },
  {
    "sourceNumber": 16,
    "lead": "Olcoman escribió números en 5 de los 10 círculos como se muestra en la figura y quiere escribir números en el resto de los 5 círculos de tal manera que la suma de los 3 números en cada lado del pentágono sea la misma. ¿Cuál es el número que debe colocar en el círculo donde está la X?",
    "area": "Razonamiento lógico",
    "type": "number",
    "fig": "16"
  },
  {
    "sourceNumber": 17,
    "lead": "En la figura adjunta, el cuadrilátero ABCD es un cuadrado de lado 6 cm, dentro del cual hay dos semicircunferencias. Los segmentos AD y BC son los diámetros de las semicircunferencias. Además, las dos semicircunferencias se intersecan en un único punto P y la altura del triángulo ABP mide la mitad del lado del cuadrado.",
    "area": "Geometría",
    "type": "choice",
    "options": [
      "9π/2 − 9 cm²",
      "9 − 9π/2 cm²",
      "36 − 9π cm²",
      "(36 − 9π)/2 cm²"
    ],
    "fig": "17",
    "ask": "Según la información anterior, el área de la región sombreada en centímetros cuadrados corresponde a:"
  },
  {
    "sourceNumber": 18,
    "lead": "Se sabe que el producto de todos los divisores positivos de 36 puede expresarse como a · 36<sup>b</sup>, con 1 &lt; a &lt; 36. ¿Cuál es el valor de a · b?",
    "area": "Números y Álgebra",
    "type": "choice",
    "options": [
      "6",
      "12",
      "18",
      "24"
    ]
  },
  {
    "sourceNumber": 19,
    "lead": "Considere la siguiente figura donde AF = 7, BF = 2, BD = a, DC = 2a, EC = b y AE = 2b.",
    "area": "Geometría",
    "type": "choice",
    "options": [
      "7",
      "2ab",
      "ab",
      "7/2"
    ],
    "fig": "19",
    "ask": "¿Cuál es, en unidades cuadradas, el área de la región sombreada?"
  },
  {
    "sourceNumber": 20,
    "lead": "Considere la siguiente sucesión de números",
    "area": "Números y Álgebra",
    "type": "choice",
    "options": [
      "0",
      "2",
      "4",
      "6"
    ],
    "ask": "¿Cuál es el dígito de las unidades del número que está en la posición 2025?",
    "pre": "<p class=\"sequence\">22 − 2,<br>222 − 22 − 2,<br>2222 − 222 − 22 − 2,<br>22222 − 2222 − 222 − 22 − 2, …</p>"
  }
];
const ANSWER_KEY=["C", "46", "C", "B", "840", "C", "115", "D", "A", "C", "D", "288", "10", "114", "36", "15", "A", "D", "A", "B"];
const SHARED={};
