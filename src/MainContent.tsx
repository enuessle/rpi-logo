import { useState, useRef, useEffect } from "react";
import rpiLogo from "./assets/rpi.png";

interface MainContentProps {
  barWidth: number;
  barHeight: number;
  barX: number;
  barY: number;
}

export default function MainContent({
  barWidth,
  barHeight,
  barX,
  barY,
}: MainContentProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- Individual draw styles ---

  // 1️⃣ Striped vertical pattern
  const drawStriped = (ctx: CanvasRenderingContext2D) => {
    const barCanvas = document.createElement("canvas");
    barCanvas.width = barWidth;
    barCanvas.height = barHeight;
    const barCtx = barCanvas.getContext("2d");
    if (!barCtx) return;

    const imageData = barCtx.createImageData(barWidth, barHeight);
    const data = imageData.data;

    let x = 0;
    while (x < barWidth) {
      const segWidth = Math.floor(Math.random() * 30) + 5; // 5-35px
      const segment: ("white" | "red")[] = [];
      for (let y = 0; y < barHeight; y++) {
        segment.push(Math.random() < 0.5 ? "white" : "red");
      }

      for (let dx = 0; dx < segWidth && x + dx < barWidth; dx++) {
        for (let y = 0; y < barHeight; y++) {
          const index = (y * barWidth + x + dx) * 4;
          const color = segment[y];
          if (color === "white") {
            data[index] = 255;
            data[index + 1] = 255;
            data[index + 2] = 255;
            data[index + 3] = 255;
          } else {
            data[index] = 214;
            data[index + 1] = 0;
            data[index + 2] = 28;
            data[index + 3] = 255;
          }
        }
      }

      x += segWidth;
    }

    barCtx.putImageData(imageData, 0, 0);
    ctx.drawImage(barCanvas, barX, barY);
  };

  // 2️⃣ Horizontal runs
  const drawHorizontalRuns = (ctx: CanvasRenderingContext2D) => {
    const barCanvas = document.createElement("canvas");
    barCanvas.width = barWidth;
    barCanvas.height = barHeight;
    const barCtx = barCanvas.getContext("2d");
    if (!barCtx) return;

    const imageData = barCtx.createImageData(barWidth, barHeight);
    const data = imageData.data;

    for (let y = 0; y < barHeight; y++) {
      let x = 0;
      while (x < barWidth) {
        const runLength = Math.floor(Math.random() * 8) + 3;
        const color = Math.random() < 0.5 ? "white" : "red";

        for (let dx = 0; dx < runLength && x + dx < barWidth; dx++) {
          const index = (y * barWidth + x + dx) * 4;
          if (color === "white") {
            data[index] = 255;
            data[index + 1] = 255;
            data[index + 2] = 255;
            data[index + 3] = 255;
          } else {
            data[index] = 214;
            data[index + 1] = 0;
            data[index + 2] = 28;
            data[index + 3] = 255;
          }
        }

        x += runLength;
      }
    }

    barCtx.putImageData(imageData, 0, 0);
    ctx.drawImage(barCanvas, barX, barY);
  };

  // 3️⃣ Block segments
  const drawBlockSegments = (ctx: CanvasRenderingContext2D) => {
    const barCanvas = document.createElement("canvas");
    barCanvas.width = barWidth;
    barCanvas.height = barHeight;
    const barCtx = barCanvas.getContext("2d");
    if (!barCtx) return;

    const imageData = barCtx.createImageData(barWidth, barHeight);
    const data = imageData.data;

    let yStart = 0;
    while (yStart < barHeight) {
      const segHeight = Math.min(
        Math.floor(Math.random() * 6) + 3,
        barHeight - yStart
      );
      let xStart = 0;
      while (xStart < barWidth) {
        const segWidth = Math.min(
          Math.floor(Math.random() * 16) + 5,
          barWidth - xStart
        );
        const color = Math.random() < 0.5 ? "white" : "red";

        for (let y = yStart; y < yStart + segHeight; y++) {
          for (let x = xStart; x < xStart + segWidth; x++) {
            const index = (y * barWidth + x) * 4;
            if (color === "white") {
              data[index] = 255;
              data[index + 1] = 255;
              data[index + 2] = 255;
              data[index + 3] = 255;
            } else {
              data[index] = 214;
              data[index + 1] = 0;
              data[index + 2] = 28;
              data[index + 3] = 255;
            }
          }
        }

        xStart += segWidth;
      }
      yStart += segHeight;
    }

    barCtx.putImageData(imageData, 0, 0);
    ctx.drawImage(barCanvas, barX, barY);
  };

  // 4️⃣ Sparse noise
  const drawSparseNoise = (
    ctx: CanvasRenderingContext2D,
    baseColor: "white" | "red"
  ) => {
    const barCanvas = document.createElement("canvas");
    barCanvas.width = barWidth;
    barCanvas.height = barHeight;
    const barCtx = barCanvas.getContext("2d");
    if (!barCtx) return;

    const imageData = barCtx.createImageData(barWidth, barHeight);
    const data = imageData.data;

    for (let y = 0; y < barHeight; y++) {
      for (let x = 0; x < barWidth; x++) {
        const index = (y * barWidth + x) * 4;
        const isBase = Math.random() < 0.9;
        const color = isBase
          ? baseColor
          : baseColor === "white"
          ? "red"
          : "white";

        if (color === "white") {
          data[index] = 255;
          data[index + 1] = 255;
          data[index + 2] = 255;
          data[index + 3] = 255;
        } else {
          data[index] = 214;
          data[index + 1] = 0;
          data[index + 2] = 28;
          data[index + 3] = 255;
        }
      }
    }

    barCtx.putImageData(imageData, 0, 0);
    ctx.drawImage(barCanvas, barX, barY);
  };

  // 5️⃣ Repeating vertical segment
  const drawRepeatingVerticalPattern = (ctx: CanvasRenderingContext2D) => {
    const barCanvas = document.createElement("canvas");
    barCanvas.width = barWidth;
    barCanvas.height = barHeight;
    const barCtx = barCanvas.getContext("2d");
    if (!barCtx) return;

    const imageData = barCtx.createImageData(barWidth, barHeight);
    const data = imageData.data;

    const segmentPattern: ("white" | "red")[] = [];
    for (let y = 0; y < barHeight; y++) {
      segmentPattern.push(Math.random() < 0.5 ? "white" : "red");
    }

    for (let x = 0; x < barWidth; x++) {
      for (let y = 0; y < barHeight; y++) {
        const index = (y * barWidth + x) * 4;
        const color = segmentPattern[y];
        if (color === "white") {
          data[index] = 255;
          data[index + 1] = 255;
          data[index + 2] = 255;
          data[index + 3] = 255;
        } else {
          data[index] = 214;
          data[index + 1] = 0;
          data[index + 2] = 28;
          data[index + 3] = 255;
        }
      }
    }

    barCtx.putImageData(imageData, 0, 0);
    ctx.drawImage(barCanvas, barX, barY);
  };

  // 6️⃣ Full random
  const drawFullRandom = (ctx: CanvasRenderingContext2D) => {
    const barCanvas = document.createElement("canvas");
    barCanvas.width = barWidth;
    barCanvas.height = barHeight;
    const barCtx = barCanvas.getContext("2d");
    if (!barCtx) return;

    const imageData = barCtx.createImageData(barWidth, barHeight);
    const data = imageData.data;

    for (let y = 0; y < barHeight; y++) {
      for (let x = 0; x < barWidth; x++) {
        const index = (y * barWidth + x) * 4;
        const color = Math.random() < 0.5 ? "white" : "red";

        if (color === "white") {
          data[index] = 255;
          data[index + 1] = 255;
          data[index + 2] = 255;
          data[index + 3] = 255;
        } else {
          data[index] = 214;
          data[index + 1] = 0;
          data[index + 2] = 28;
          data[index + 3] = 255;
        }
      }
    }

    barCtx.putImageData(imageData, 0, 0);
    ctx.drawImage(barCanvas, barX, barY);
  };

  // 7️⃣ Text fill
  const drawWordBar = (ctx: CanvasRenderingContext2D) => {
    const words = [
      // 25 big meme words
      "sigma",
      "rizz",
      "sus",
      "yeet",
      "based",
      "cringe",
      "bruh",
      "skibidi",
      "gyatt",
      "cap",
      "no-cap",
      "twitter",
      "grindset",
      "ratio",
      "goat",
      "mog",
      "slay",
      "bet",
      "npc",
      "ratio",
      "vibe",
      "chad",
      "simp",
      "drip",
      "mid",

      // 75 assorted normal/random words
      "apple",
      "banana",
      "car",
      "dog",
      "elephant",
      "forest",
      "guitar",
      "house",
      "island",
      "jungle",
      "kite",
      "lemon",
      "mountain",
      "notebook",
      "ocean",
      "penguin",
      "quartz",
      "river",
      "sun",
      "tree",
      "umbrella",
      "violin",
      "water",
      "yummy",
      "yarn",
      "zebra",
      "ant",
      "ball",
      "cloud",
      "desk",
      "egg",
      "fire",
      "garden",
      "hat",
      "ice",
      "jacket",
      "key",
      "lamp",
      "moon",
      "nest",
      "orange",
      "pencil",
      "queen",
      "rose",
      "star",
      "table",
      "umbrella",
      "vase",
      "window",
      "dance",
      "yogurt",
      "zipper",
      "anchor",
      "brush",
      "circle",
      "door",
      "engine",
      "flute",
      "globe",
      "hill",
      "igloo",
      "jar",
      "kite",
      "leaf",
      "map",
      "needle",
      "oar",
      "plate",
      "quill",
      "rope",
      "spoon",
      "train",
      "urn",
      "vulture",
      "wheel",
      "x-ray",
      "yacht",
      "zeppelin",
    ];

    const barCanvas = document.createElement("canvas");
    barCanvas.width = barWidth;
    barCanvas.height = barHeight;
    const barCtx = barCanvas.getContext("2d");
    if (!barCtx) return;

    // Red background
    barCtx.fillStyle = "#d6001c";
    barCtx.fillRect(0, 0, barWidth, barHeight);

    // Fill with white words horizontally until full
    let y = 0;
    const lineHeight = 40; // fixed height for each line of text

    while (y < barHeight) {
      let x = 0;
      while (x < barWidth) {
        const word = words[Math.floor(Math.random() * words.length)];
        const fontSize = 30;
        barCtx.font = `bold ${fontSize}px sans-serif`;
        barCtx.fillStyle = "#ffffff";

        barCtx.fillText(word, x, y + fontSize);

        x += barCtx.measureText(word).width;
      }
      y += lineHeight;
    }

    ctx.drawImage(barCanvas, barX, barY);
  };

  const drawGeometricPattern = (ctx: CanvasRenderingContext2D) => {
    const barCanvas = document.createElement("canvas");
    barCanvas.width = barWidth;
    barCanvas.height = barHeight;
    const barCtx = barCanvas.getContext("2d");
    if (!barCtx) return;

    // Background red
    barCtx.fillStyle = "#D6001C";
    barCtx.fillRect(0, 0, barWidth, barHeight);

    const shapeCount = Math.floor((barWidth * barHeight) / 100); // adjust density

    for (let i = 0; i < shapeCount; i++) {
      barCtx.fillStyle = "white";

      const shapeType = Math.floor(Math.random() * 4); // 0=rect,1=circle,2=triangle,3=line
      const x = Math.random() * barWidth;
      const y = Math.random() * barHeight;
      const size = Math.random() * 20 + 5; // 5-25px shapes

      switch (shapeType) {
        case 0: // rectangle
          barCtx.fillRect(x, y, size, size);
          break;
        case 1: // circle
          barCtx.beginPath();
          barCtx.arc(x, y, size / 2, 0, Math.PI * 2);
          barCtx.fill();
          break;
        case 2: // triangle
          barCtx.beginPath();
          barCtx.moveTo(x, y);
          barCtx.lineTo(x + size, y);
          barCtx.lineTo(x + size / 2, y - size);
          barCtx.closePath();
          barCtx.fill();
          break;
        case 3: // line
          barCtx.beginPath();
          barCtx.moveTo(x, y);
          barCtx.lineTo(x + size, y + (Math.random() > 0.5 ? size : -size));
          barCtx.strokeStyle = "white";
          barCtx.lineWidth = 2;
          barCtx.stroke();
          break;
      }
    }

    ctx.drawImage(barCanvas, barX, barY);
  };

  // --- Main drawBar ---
  const drawBar = (ctx: CanvasRenderingContext2D, fillWhite = false) => {
    if (fillWhite) {
      const barCanvas = document.createElement("canvas");
      barCanvas.width = barWidth;
      barCanvas.height = barHeight;
      const barCtx = barCanvas.getContext("2d");
      if (!barCtx) return;

      const imageData = barCtx.createImageData(barWidth, barHeight);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
        data[i + 3] = 255;
      }

      barCtx.putImageData(imageData, 0, 0);
      ctx.drawImage(barCanvas, barX, barY);
    } else {
      const style = Math.floor(Math.random() * 9);
      switch (style) {
        case 0:
          drawStriped(ctx);
          break;
        case 1:
          drawHorizontalRuns(ctx);
          break;
        case 2:
          drawBlockSegments(ctx);
          break;
        case 3:
          drawSparseNoise(ctx, "white");
          break;
        case 4:
          drawSparseNoise(ctx, "red");
          break;
        case 5:
          drawRepeatingVerticalPattern(ctx);
          break;
        case 6:
          drawFullRandom(ctx);
          break;
        case 7:
          drawWordBar(ctx);
          break;
        case 8:
          drawGeometricPattern(ctx);
          break;
      }
    }
  };

  // --- Draw image + bar ---
  const drawImage = (initialWhite = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = rpiLogo;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      drawBar(ctx, initialWhite);
      setImageUrl(canvas.toDataURL("image/png"));
    };
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "rpi_random_bar.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  useEffect(() => {
    drawImage(true); // white bar on load
  }, []);

  return (
    <div className="main-content">
      <div className="main-text">
        <h1>Logo System</h1>
        <h2>
          Our logo embodies RPI’s commitment to precision, experimentation, and
          setting new standards. This isn’t just another logo — it’s a flexible
          identity system that encodes the multitude of dimensions, domains, and
          real-world contexts of RPI’s research and education impact.
        </h2>
      </div>

      <div className="image-container">
        <img
          src={rpiLogo}
          alt="Personalized RPI Bar"
          className="preview-image"
        />
      </div>

      <div className="main-text">
        <h2>
          The bar that anchors the RPI logo translates our exploratory approach
          and outlook into visual form. Both a technical signal and a creative
          canvas, it invites the RPI community to experiment, encode, and
          express how we measure and create impact.
        </h2>
        <h3>
          Each bar is a 500 × 36px space that holds infinite possibilities, or
          at the very least 2^(18,000) of them. With enough bars for each atom
          in the universe to have over 10^(5338) unique bars to themselves, the
          bar is truely a way for everyone to show their own individuality.
        </h3>
        <h2>
          With
          3466745429523766868669875201719137528580444595048549101118260943266639857068382934568148647598693689476027886073289708998658484404112522762803277048875929624763619202277389565745632136627531638561811529302270317023945889677601070834646152283725860940678708218692055241033824279768703157515370800265271650620158955950890789222179414868679373682038581607582138035231803499300332215525586652834955220251131283536412267315428323787511236993556828237137351445763441215605062551563941542435689733918295856082539874553764061288332692528985765225895240123736960716733982091696821447186469572701037016067066655697327978743913822915903811541090663468906796336350680410722631021749004762071937153476277746518173322958225484034407034244899220136460577608531311312487181862234616933207818775725578764079189079180223379778490843975608207231679575715315931687222342284338676685773413493005811679860281408087852395865361850182265500625024374804191460864354854106851237688157847752664014656989256174088160718293609880169404298653163471076102851161248744625432274142076370401926474950118314403812441248508501110234926454814825062327166770975746266615608930894681737916044575489285351358860753580234435114925778796592057058591847194073255704845122667622300676232816383881663415933822759552992687544059146405098667498542640455210322463750363717121900062452302016759110698828640364482337131529115573344800916244658348894434368129959706489220610934894872375761383213638477006424544816467320068233207316031341530285868730381994796310243391722606841439542216481221814656683298619719569783832869243906214223659661661672301921261405213766417469708294728498591825562227028272962195867977797555184300880665673192270778320319397783661966865423833964650592906921187116100904108530419124385520033801247935442979349084958166960096381306582576591732388625229369225435281269798040285859325172648918283162991266001207936050803978230564451726132268717389266573447353270999630387278068681629236702878532651866937326547376306298759875213865728466209291452190518778368214689433923474900690743698014479740952347712759770436031047940285022105423904298440268980305945253267123089503210291805777368776438954628040032540436229221205155567034644354618019111524189486893593602933371966832243477848139399141884034499812297337000731453430598090876255578172355833825770949446738893252531709766798753631178635778829943193062914112399508840336217677194720000238609026531314058206822625990751464926198120177102127995522391956695113060029952847581449309398042189101278011415961850392519962162469897658479841901519632996960252306338917028592236254373926001549369577071945103259317223937084815844536524711639127838867446544975069463794304979084953771451928808710187997969713806074924255816313345752062085426231810198922436363114040542519697009174038916780003104721012999688173145257113904266587507573690365625931560679443914726977031959714121040926079681349349306451416977350469772215305379074953943060217477701480598285487862711820782704979643159629202795521017364198013997484900377451574775724058686846693297453967157892715267851097757693229944262513415542969631595833973527523841456620886817374561060679920918448779267147405919008602884815016875666121933539744336790745267160483113476523927550795108814985742155870454613889201865013990710544909767091957652642591016901277956674363964321575723491596970281419271028056528129783969637446999350932041128058924499394371786223210976336161848335065554709154934405172420989752718355742568992398071460932023039361448824275396734743650585868894656400651458867126833869947552418813520158564864569991537207632167039153491031179952791325779878058820574989893999981213967303477575024799961794896903097060745901172488812768071052971078257596533849096896963786097934781910675507229932359772343178317483463270886897398810823752912433387482556321274836357386530210277444960894291600558519930199677073212308322595636004830156377165284596407991620095174828908558667420712349061161688996902128380696743454917615993000901753063115968839803511161564408547621027764594609446216751492700261952161982828999900776636697692734924374830516579398631304897271666967529912147924439414725561283749408157519908936562787632633405850323272247739233425636923042453393320162433559390380667577308126639718422845730147964355078917273280024156364495091370199222940021018205371559723587482883796082885152094719511798379582214727689976266911542354078492013801934078616867821651189390395135352386785030500860198000641008918507822557434342724622515376649362661754588723602908665986188974683036160125444410573390773897420172754373932486563477307727729720901588946314641069922947960599784154540529415860517945726551866092288996571946292997554524404956482902108127925623263624656314999056476406341480861315827042045846327567723985927092168611444231317253652302766061592043158654928151496523030751707782642124364008446942216392199263833208513605154748746262935597866344481698065255702161291291528025816024003773741989731123299511076201131096241429620950849677082854717721864235196127706743170249384061545256091327156936706483579413026248777790629684044779249804993805600558408900028965035082396587528040728622309369868533357895550904419266675425004371924234589251343122697617593738786233924312055470267630128838789134854292446045985192331216793372318925438942555659227679298529525985550247011426983293707462778873808721405985472574230377291014132619196882394116444389376
          possibilities, it's important for everyone to be able to set their own
          bar. For the people who don't want to do that however, you can still
          have a bar completely personal to you.
        </h2>
        <h3></h3>
      </div>

      <div className="button-container">
        <button onClick={() => drawImage()} className="btn generate-btn">
          Personalize
        </button>
        <button onClick={downloadImage} className="btn download-btn">
          Download
        </button>
      </div>

      {imageUrl && (
        <div className="image-container">
          <img
            src={imageUrl}
            alt="Personalized RPI Bar"
            className="preview-image"
          />
        </div>
      )}

      <canvas ref={canvasRef} className="hidden-canvas" />

      <div className="footer">
        <div className="footer-bar" />
        <div className="footer-texts">
          <span className="left-text">
            ©2025{" "}
            <a href="https://enuessle.dev/" className="footer-link">
              Ethan Nuessle
            </a>
          </span>
          <span className="middle-text">
            Need help? Use{" "}
            <a href="https://www.google.com/" className="footer-link">
              google.com
            </a>
            .
          </span>
        </div>
      </div>

      <div className="main-text">
        <h2>_</h2>
      </div>
    </div>
  );
}
