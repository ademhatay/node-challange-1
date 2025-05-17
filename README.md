# Kişisel Komut Satırı Günlüğü (CLI Journal) / Personal Command-Line Journal (CLI Journal)

---

##  Türkçe Açıklama

### Projenin Amacı
Kullanıcının komut satırı arayüzü (CLI) üzerinden günlük girişleri ekleyebileceği, listeleyebileceği, belirli bir tarihe ait girişleri okuyabileceği ve isteğe bağlı olarak girişleri silebileceği basit bir günlük uygulaması geliştirmek. Bu proje, Node.js temel modülleri ve dosya sistemi işlemleri üzerine pratik yapmak için tasarlanmıştır. Amaç, dışarıdan yardım almadan, mevcut bilgilerinizi kullanarak bir ürün ortaya koymaktır.

### Temel Özellikler (Minimum Gereksinimler)

1.  **Yeni Günlük Girişi Ekleme:**
    * Kullanıcı, komut satırından yeni bir günlük girişi ekleyebilmeli.
    * Giriş, metin tabanlı olmalı ve otomatik olarak o anki tarih ve saat ile etiketlenmeli.
    * **Örnek Komut:** `node journal.js add "Bugün hava çok güzeldi ve Node.js ile yeni bir projeye başladım."`
    * **Depolama Önerisi:** Günlük girişleri, her biri ayrı bir metin dosyası olarak (örneğin, `YYYY-MM-DD_HHMMSS.txt` formatında dosya adı) bir `entries` klasöründe saklanabilir.

2.  **Tüm Günlük Girişlerini Listeleme:**
    * Kullanıcı, mevcut tüm günlük girişlerinin bir listesini (dosya adları veya tarihleriyle birlikte kısa bir önizleme) görebilmeli.
    * **Örnek Komut:** `node journal.js list`
    * **Örnek Çıktı (ayrı dosyalar kullanılıyorsa):**
        ```
        Günlük Girişleriniz:
        - 2025-05-17_180000.txt
        - 2025-05-16_103000.txt
        ...
        ```

3.  **Belirli Bir Günlük Girişini Okuma:**
    * Kullanıcı, dosya adını belirterek belirli bir günlük girişinin tüm içeriğini okuyabilmeli.
    * **Örnek Komut (ayrı dosya sistemi için):** `node journal.js read 2025-05-17_180000.txt`
    * **Örnek Çıktı:**
        ```
        Tarih: 2025-05-17 18:00:00
        ---
        Bugün hava çok güzeldi ve Node.js ile yeni bir projeye başladım.
        ```

### Kullanılabilecek Node.js Modülleri/Teknikleri
* **`process.argv`**: Komut satırı argümanlarını almak için.
* **`fs` (File System) Modülü**:
    * `fs.writeFile` veya `fs.writeFileSync`: Yeni günlük girişi dosyası oluşturmak için.
    * `fs.readdir` veya `fs.readdirSync`: `entries` klasöründeki tüm dosyaları listelemek için.
    * `fs.readFile` veya `fs.readFileSync`: Belirli bir günlük dosyasının içeriğini okumak için.
    * `fs.mkdirSync` veya `fs.mkdir`: `entries` klasörünü oluşturmak için (eğer yoksa).
    * `fs.existsSync`: Bir dosya veya klasörün var olup olmadığını kontrol etmek için.
* **`path` Modülü**: Dosya yollarını platformdan bağımsız bir şekilde birleştirmek için (`path.join`).
* **`Date` Objesi**: Günlük girişleri için tarih ve saat bilgisi almak ve formatlamak için.
* **Fonksiyonlar**: Kodunuzu modüler ve okunabilir hale getirmek için (örneğin, `addEntry()`, `listEntries()`, `readEntry()`).
* **Koşul İfadeleri (`if/else`, `switch`)**: Kullanıcının girdiği ilk argümana (`add`, `list`, `read`) göre farklı işlemleri tetiklemek için.
* **Döngüler (`for`, `forEach`)**: Dosyaları listelerken veya işlerken kullanmak için.

### İsteğe Bağlı Geliştirmeler (Challenge'lar)
* **Giriş Silme:** Kullanıcının belirli bir günlük girişini silebilmesi için bir `remove --filename="dosya_adi.txt"` komutu ekleyin (`fs.unlink` veya `fs.unlinkSync`).
* **Tarihe Göre Filtreleme/Arama:** `list` komutuna bir tarih parametresi (`--date="YYYY-MM-DD"`) ekleyerek sadece o tarihe ait girişlerin listelenmesini sağlayın.
* **JSON Depolama:** Tüm girişleri tek bir JSON dosyasında bir dizi obje olarak saklamayı deneyin. Bu, girişleri yönetmeyi biraz daha karmaşıklaştırabilir ama farklı bir pratik sunar (`JSON.parse`, `JSON.stringify`).
* **Kelime Arama:** Günlük girişleri içinde belirli bir kelimeyi arayan bir `search "aranan kelime"` komutu ekleyin.
* **Daha İyi Argüman Yönetimi:** `process.argv`'yi manuel olarak ayrıştırmak yerine, `yargs` veya `commander` gibi bir kütüphane kullanmayı düşünebilirsiniz (bu, "hiçbir yere bakmadan" kuralını biraz esnetebilir) ya da kendi basit argüman ayrıştırıcınızı yazabilirsiniz.
* **Kullanıcı Dostu Çıktılar:** Çıktıları `chalk` gibi bir kütüphane ile renklendirerek daha okunaklı hale getirin.

### Odaklanılması Gerekenler
* **Temel Node.js Akışı:** Komut satırı argümanlarını alın, ilgili işlemi belirleyin, dosya sistemiyle etkileşime girin ve sonucu kullanıcıya gösterin.
* **Hata Yönetimi (Basit Düzeyde):** Örneğin, okunmak istenen dosya bulunamazsa veya yanlış komut girilirse kullanıcıya anlamlı bir mesaj gösterin.
* **Kod Organizasyonu:** Her şeyi tek bir devasa fonksiyona yazmak yerine küçük, yönetilebilir fonksiyonlar oluşturun.
* **Kendi Başına Problem Çözme:** Bir şey beklediğiniz gibi çalışmadığında, `console.log` ile değişkenlerin değerlerini kontrol ederek veya mantığınızı adım adım gözden geçirerek sorunu bulmaya çalışın.

### Nasıl Başlanır?
1.  Projeniz için bir klasör oluşturun (örn: `cli-journal`).
2.  Bu klasörün içine `journal.js` adında ana JavaScript dosyanızı oluşturun.
3.  Günlük girişlerini saklamak için bir `entries` alt klasörü oluşturun.
4.  Önce bir özelliği (örneğin, `add` komutu) tamamlayın, sonra diğerlerine geçin. Her adımda kodunuzu test etmeyi unutmayın!
    * Örnek test: `node journal.js add "İlk deneme günlüğüm."`
    * Sonra: `node journal.js list`

---

## English Description

### Project Purpose
To develop a simple journal application that allows a user to add, list, read (specific to a date), and optionally delete journal entries via a command-line interface (CLI). This project is designed to practice fundamental Node.js modules and file system operations. The goal is to create a product using your existing knowledge without external help.

### Core Features (Minimum Requirements)

1.  **Add New Journal Entry:**
    * The user should be able to add a new journal entry from the command line.
    * The entry should be text-based and automatically timestamped with the current date and time.
    * **Example Command:** `node journal.js add "Today the weather was great and I started a new Node.js project."`
    * **Storage Suggestion:** Journal entries can be stored as individual text files (e.g., with filenames like `YYYY-MM-DD_HHMMSS.txt`) in an `entries` directory.

2.  **List All Journal Entries:**
    * The user should be able to see a list of all existing journal entries (perhaps filenames or a short preview with dates).
    * **Example Command:** `node journal.js list`
    * **Example Output (if using separate files):**
        ```
        Your Journal Entries:
        - 2025-05-17_180000.txt
        - 2025-05-16_103000.txt
        ...
        ```

3.  **Read a Specific Journal Entry:**
    * The user should be able to read the full content of a specific journal entry by specifying its filename.
    * **Example Command (for separate file system):** `node journal.js read 2025-05-17_180000.txt`
    * **Example Output:**
        ```
        Date: 2025-05-17 18:00:00
        ---
        Today the weather was great and I started a new Node.js project.
        ```

### Suggested Node.js Modules/Techniques
* **`process.argv`**: To get command-line arguments.
* **`fs` (File System) Module**:
    * `fs.writeFile` or `fs.writeFileSync`: To create new journal entry files.
    * `fs.readdir` or `fs.readdirSync`: To list all files in the `entries` directory.
    * `fs.readFile` or `fs.readFileSync`: To read the content of a specific journal file.
    * `fs.mkdirSync` or `fs.mkdir`: To create the `entries` directory (if it doesn't exist).
    * `fs.existsSync`: To check if a file or directory exists.
* **`path` Module**: To join file paths in a platform-independent way (`path.join`).
* **`Date` Object**: To get and format date and time information for journal entries.
* **Functions**: To make your code modular and readable (e.g., `addEntry()`, `listEntries()`, `readEntry()`).
* **Conditional Statements (`if/else`, `switch`)**: To trigger different actions based on the first argument entered by the user (`add`, `list`, `read`).
* **Loops (`for`, `forEach`)**: For iterating when listing or processing files.

### Optional Challenges/Enhancements
* **Delete Entry:** Add a `remove --filename="filename.txt"` command to allow the user to delete a specific journal entry (`fs.unlink` or `fs.unlinkSync`).
* **Filter/Search by Date:** Add a date parameter (`--date="YYYY-MM-DD"`) to the `list` command to display entries only from that specific date.
* **JSON Storage:** Try storing all entries as an array of objects in a single JSON file. This might make managing entries slightly more complex but offers different practice (`JSON.parse`, `JSON.stringify`).
* **Keyword Search:** Add a `search "keyword"` command to search for a specific word within journal entries.
* **Better Argument Handling:** Instead of manually parsing `process.argv`, consider using a library like `yargs` or `commander` (this might bend the "no looking anywhere" rule slightly) or write your own basic argument parser.
* **User-Friendly Output:** Make the CLI output more readable by colorizing it with a library like `chalk`.

### Key Focus Areas
* **Basic Node.js Flow:** Get command-line arguments, determine the relevant action, interact with the file system, and display the result to the user.
* **Error Handling (Basic Level):** For example, if a file to be read is not found or an incorrect command is entered, display a meaningful message to the user.
* **Code Organization:** Instead of writing everything in one giant function, create small, manageable functions.
* **Independent Problem-Solving:** When something doesn't work as expected, try to find the issue by using `console.log` to check variable values or by reviewing your logic step-by-step.

### Getting Started
1.  Create a folder for your project (e.g., `cli-journal`).
2.  Inside this folder, create your main JavaScript file, `journal.js`.
3.  Create an `entries` subdirectory to store your journal files.
4.  Complete one feature at a time (e.g., the `add` command), then move on to the others. Don't forget to test your code at each step!
    * Example test: `node journal.js add "My first trial journal entry."`
    * Then: `node journal.js list`

---
Happy Coding! / İyi Kodlamalar!