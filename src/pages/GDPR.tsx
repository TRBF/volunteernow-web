import React from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';

const GDPR = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Politică de Confidențialitate
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom align="center">
            VolunteerNow
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Generalități
          </Typography>
          <Typography variant="body1" paragraph>
            Regulamentul 2016/679 privind protecţia persoanelor fizice în ceea ce priveşte prelucrarea datelor cu caracter personal şi privind libera circulaţie a acestor date (General Data Protection Regulation, în prezentul document – GDPR, Regulament sau RGPD) a fost adoptat de Parlamentul European şi Consiliul Uniunii Europene în 27 aprilie 2016, prevederile acestuia fiind direct aplicabile începând cu data de 25 mai 2018. Acest Regulament abrogă, în mod expres, Directiva 95/46/CE, înlocuind astfel și prevederile Legii nr. 677/2001 (în prezent, abrogate).
          </Typography>
          <Typography variant="body1" paragraph>
            Regulamentul este direct aplicabil în toate statele membre, protejând drepturile tuturor persoanelor fizice aflate pe teritoriul Uniunii Europene. Din punct de vedere material, Regulamentul se aplică tuturor operatorilor care prelucrează date cu caracter personal. Regulamentul nu se aplică prelucrării datelor cu caracter personal care privesc persoane juridice şi, în special, întreprinderi cu personalitate juridică, inclusiv numele şi tipul de persoană juridică şi datele de contact ale persoanei juridice.
          </Typography>
          <Typography variant="body1" paragraph>
            Datele cu caracter personal sunt definite ca fiind orice informaţii privind o persoană fizică identificată sau identificabilă ("persoana vizată"); o persoană fizică identificabilă este o persoană care poate fi identificată, direct sau indirect, în special prin referire la un element de identificare, cum ar fi un nume, un număr de identificare, date de localizare, un identificator online sau la unul sau mai multe elemente specifice, proprii identităţii sale fizice, fiziologice, genetice, psihice, economice, culturale sau sociale.
          </Typography>
          <Typography variant="body1" paragraph>
            Prelucrarea datelor cu caracter personal presupune orice operaţiune sau set de operaţiuni efectuate asupra datelor sau asupra seturilor de date cu caracter personal, cu sau fără utilizarea de mijloace automatizate, cum ar fi colectarea, înregistrarea, organizarea, structurarea, stocarea, adaptarea sau modificarea, extragerea, consultarea, utilizarea, divulgarea prin transmitere, diseminarea sau punerea la dispoziţie în orice alt mod, alinierea sau combinarea, restricţionarea, ştergerea sau distrugerea.
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Identitatea operatorului
          </Typography>
          <Typography variant="body1" paragraph>
            Având în vedere articolul 4 punctul 7 din Regulament, care definește noțiunea de "operator" ca fiind persoana fizică sau juridică, autoritatea publică, agenţia sau alt organism care, singur sau împreună cu altele, stabileşte scopurile şi mijloacele de prelucrare a datelor cu caracter personal, operatorul care prelucrează date cu caracter personal prin intermediul acestei aplicații este .................
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Colectarea datelor personale
          </Typography>
          <Typography variant="body2" paragraph fontWeight="bold">
            Care sunt datele cu caracter personal colectate
          </Typography>
          <Typography variant="body1" paragraph>
            Operatorul acestei aplicații colectează, stochează şi prelucrează următoarele date personale:
          </Typography>
          <Typography variant="body2" paragraph fontWeight="bold">
            Pentru crearea unui cont în aplicație și pentru servicii conexe contului:
          </Typography>
          <Typography variant="body1" component="ul">
            <li>Nume, prenume</li>
            <li>Date de contact (e-mail)</li>
            <li>Data nașterii</li>
            <li>Imagine facială (fotografie profil utilizator, secțiune preferențială; tot preferențiale sunt și secțiuni precum descrierea utilizatorului sau temele de voluntariat)</li>
            <li>Identificatori online (IP, cookies)</li>
          </Typography>
          
          <Typography variant="body2" paragraph fontWeight="bold">
            Pentru celelalte servicii oferite:
          </Typography>
          <Typography variant="body1" component="ul">
            <li>Nume, prenume și adresă e-mail (pentru formular de contact)</li>
            <li>Nume utilizator și e-mail (pentru secțiune comentarii)</li>
          </Typography>
          
          <Typography variant="body1" paragraph>
            Având în vedere că Regulamentul interzice, în principal, "prelucrarea de date cu caracter personal care dezvăluie originea rasială sau etnică, opiniile politice, confesiunea religioasă sau convingerile filozofice sau apartenenţa la sindicate şi prelucrarea de date genetice, de date biometrice pentru identificarea unică a unei persoane fizice, de date privind sănătatea sau de date privind viaţa sexuală sau orientarea sexuală ale unei persoane fizice" (conform art. 9 alin. 1), sunt stabilite apoi situațiile în care este permisă prelucrarea unor astfel de date:
          </Typography>
          <Typography variant="body1" component="ol" style={{listStyleType: 'lower-alpha'}}>
            <li>există consimțământul explicit al persoanei vizate;</li>
            <li>prelucrarea este necesară în scopul îndeplinirii obligaţiilor şi al exercitării unor drepturi specifice ale operatorului sau ale persoanei vizate în domeniul ocupării forţei de muncă şi al securităţii sociale şi protecţiei sociale;</li>
            <li>prelucrarea este necesară pentru protejarea intereselor vitale ale persoanei vizate sau ale unei alte persoane fizice, atunci când persoana vizată se află în incapacitate fizică sau juridică de a-şi da consimţământul;</li>
            <li>prelucrarea este efectuată în cadrul activităţilor lor legitime şi cu garanţii adecvate de către o fundaţie, o asociaţie sau orice alt organism fără scop lucrativ şi cu specific politic, filozofic, religios sau sindical, cu condiţia ca prelucrarea să se refere numai la membrii sau la foştii membri ai organismului respectiv sau la persoane cu care acesta are contacte permanente în legătură cu scopurile sale şi ca datele cu caracter personal să nu fie comunicate terţilor fără consimţământul persoanelor vizate;</li>
            <li>prelucrarea se referă la date cu caracter personal care sunt făcute publice în mod manifest de către persoana vizată;</li>
            <li>prelucrarea este necesară pentru constatarea, exercitarea sau apărarea unui drept în instanţă sau ori de câte ori instanţele acţionează în exerciţiul funcţiei lor judiciare;</li>
            <li>prelucrarea este necesară din motive de interes public major, în baza dreptului Uniunii sau a dreptului intern, care este proporţional cu obiectivul urmărit, respectă esenţa dreptului la protecţia datelor şi prevede măsuri corespunzătoare şi specifice pentru protejarea drepturilor fundamentale şi a intereselor persoanei vizate;</li>
            <li>prelucrarea este necesară în scopuri legate de medicina preventivă sau a muncii, de evaluarea capacităţii de muncă a angajatului, de stabilirea unui diagnostic medical, de furnizarea de asistenţă medicală sau socială sau a unui tratament medical sau de gestionarea sistemelor şi serviciilor de sănătate sau de asistenţă socială, în temeiul dreptului Uniunii sau al dreptului intern sau în temeiul unui contract încheiat cu un cadru medical şi sub rezerva respectării condiţiilor şi garanţiilor prevăzute în Regulament;</li>
            <li>prelucrarea este necesară din motive de interes public în domeniul sănătăţii publice, cum ar fi protecţia împotriva ameninţărilor transfrontaliere grave la adresa sănătăţii sau asigurarea de standarde ridicate de calitate şi siguranţă a asistenţei medicale şi a medicamentelor sau a dispozitivelor medicale, în temeiul dreptului Uniunii sau al dreptului intern, care prevede măsuri adecvate şi specifice pentru protejarea drepturilor şi libertăţilor persoanei vizate, în special a secretului profesional; sau</li>
            <li>prelucrarea este necesară în scopuri de arhivare în interes public, în scopuri de cercetare ştiinţifică sau istorică ori în scopuri statistic, proporţional cu obiectivul urmărit, respectând esenţa dreptului la protecţia datelor şi prevede măsuri corespunzătoare şi specifice pentru protejarea drepturilor fundamentale şi a intereselor persoanei vizate.</li>
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Obținerea Consimțământului
          </Typography>
          <Typography variant="body2" paragraph fontWeight="bold">
            Generalități
          </Typography>
          <Typography variant="body1" paragraph>
            Pentru ca prelucrarea datelor cu caracter personal să fie legală, GDPR prevede ca aceasta să fie efectuată în baza unui motiv legitim, precum executarea sau încheierea unui contract, îndeplinirea unei obligații legale, sau în baza consimțământului valabil exprimat de persoana vizată în prealabil. În acest din urmă caz, operatorului i se impune obligația de a putea demonstra faptul că persoana în cauză și-a dat consimțământul pentru prelucrarea respectivă. Consimțământul exprimat sub imperiul Directivei 95/46/CE rămâne valabil dacă acesta îndeplinește condițiile prevăzute de GDPR.
          </Typography>
          <Typography variant="body1" paragraph>
            Acordarea consimțământului trebuie să fie realizată printr-o declarație sau printr-o acțiune neechivocă care să constituie o manifestare liber exprimată, specifică, în cunoştinţă de cauză şi clară a acordului persoanei vizate pentru prelucrarea datelor sale cu caracter personal. În cazul în care consimțământul persoanei vizate este dat în contextul unei declarații, în format electronic sau în scris, care se referă și la alte aspecte, cererea privind consimțământul trebuie să fie prezentată într-o formă care o diferențiază în mod clar de celelalte aspecte, putând fi realizată chiar și prin bifarea unei căsuțe.
          </Typography>
          <Typography variant="body1" paragraph>
            Pentru ca prelucrarea datelor cu caracter personal să fie legală, GDPR prevede ca aceasta să fie efectuată în baza unui motiv legitim, precum executarea sau încheierea unui contract, îndeplinirea unei obligații legale, sau în baza consimțământului valabil exprimat de persoana vizată în prealabil. În acest din urmă caz, operatorului i se impune obligația de a putea demonstra faptul că persoana în cauză și-a dat consimțământul pentru prelucrarea respectivă. Consimțământul exprimat sub imperiul Directivei 95/46/CE rămâne valabil dacă acesta îndeplinește condițiile prevăzute de GDPR.
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Durata stocării
          </Typography>
          <Typography variant="body1" paragraph>
            Datele tale personale sunt prelucrate pentru perioada necesară îndeplinirii scopului pentru care au fost colectate, cât și pentru un interval de 5 ani de la data ultimei interacțiuni cu persoana vizată, cu excepția cazului în care există o obligație legală de păstrare a acestor date pentru o perioadă mai lungă. Revizuim în fiecare an datele colectate, analizând în ce măsură păstrarea lor este necesară scopurilor menționate, intereselor dvs. legitime sau îndeplinirii obligațiilor legale de către Operator. După expirarea perioadelor menționate mai sus, datele vor fi șterse sau anonimizate, cu excepția cazului în care există o obligație legală de arhivare pentru o perioadă mai lungă sau un alt temei legal pentru a continua prelucrarea.
          </Typography>
          
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Comunicarea datelor personale către alți destinatari
          </Typography>
          <Typography variant="body1" paragraph>
            Operatorul comunică datele personale (doar dacă se impune) către entități/autorități publice (ISU, ANAF, Poliție, Instanțe Judecătorești, Parchete, Primărie, Consiliu Local, Consiliu Județean, Ministere etc.) și altor instituții care pot pretinde acces la astfel de informații în condițiile legii. Nu transmitem datele către ţări terţe sau organizaţii internaţionale, cu excepția situațiilor în care raportul de colaborare existent o impune.
          </Typography>
          <Typography variant="body1" paragraph>
            Astfel, în baza relațiilor de colaborare existente și pentru a putea furniza serviciile la cele mai înalte standarde, vom comunica datele furnizate către:
          </Typography>
          <Typography variant="body1" component="ul">
            <li>ONG-urile cu care operatorul colaborează;</li>
            <li>precum și către alți furnizori de servicii online (diverse tool-uri și plugin-uri), astfel cum sunt aceștia menționați în prezenta Politică.</li>
          </Typography>
          
          <Divider sx={{ my: 4 }} />
          
          {/* Additional sections would continue here - showing only part of the content for brevity */}
          
          <Typography variant="body1" sx={{ mt: 4, fontStyle: 'italic' }}>
            Ultima actualizare: 02.04.2025
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default GDPR; 