# אפליקציית רשימת קניות
אפליקציית רשימת הקניות היא פתרון מבוסס מערכת אינטרנטית המאפשר למשתמשים ליצור ולנהל את רשימות הקניות שלהם. זה כולל הוספת מוצרים, בחירת קטגוריות צפיה במוצרים קיימים, צפיה בסיכום ההזמנה וביצוע הזמנה.

## מאפיינים עיקריים
- יצירה וינןהל רשימות קניות
- הוספה,עריכה ומחיקת מוצרים לפי שם וקטגוריה
- בחירה מתוך קטגוריות מוגדרות מראש
- עמוד סיכום לאישור הזמנה
- השלמה אוטומטית למוצרים שהוזמנו קודם לכן
- אקורדיון כדי להראות את עגלת הקניות ידידותית עם אפשרות לעריכת כמות המוצרים ומחיקת מוצר.

## טכנולוגיות בשימוש
- צד לקוח: React
- צד שרת (מסך ראשון): Node.JS
- צד שרת (מסך שני): .NET Core & Entity Framework
- מסד נתונים: רלציוני, MS-SQL אחסון באמצעות AZURE
- ספריית עיצוב ממשק משתמש: Material-UI
- אחסון בענן - Azure
- ניהול חנות ומצבים: Redux ToolKit

### דרישות מוקדמות
- Node.js for the frontend
- .NET Core 6 for the backend
- MS-SQL Server for the database
- Git for version control
###הוראות התקנה
**- Clone the repository:**
    git clone (https://github.com/noamnorman21/ShoppingList/)
- Install frontend dependencies:
    cd Client/shopping-list
    npm install
- Install Node.js backend dependencies:
    cd Server/NodeJS/server
    npm install

###הוראות שימוש
- **Start the frontend:**
    cd Client/shopping-list
    npm start
- **Start the Node.js backend:**
    cd Server/NodeJS/server
    npm start
    Open your browser and navigate to http://localhost:3000 to access the application.

- **Start the .Net Core backend:**
    Server/DotNotCore/WebAPI.sln
    run F5 local- https://localhost:7115/
#### הערות 
**אבקש לציין כי כפי שניתן לראות גם בהיסטוריה ביצעתי העלאה לענן באמצעות AZURE בהצלחה, אך ברגע האחרון נפל/חסמו המשתמש/שרת שהחזיק את הפרוייקטים. ניסיתי ליצור קשר עם התמיכה של AZURE אך ללא הצלחה. בררתי עם עוד מכר וטען שזה קורה לו. ככל הנראה תקלה רוחבית. במידה וניתן יהיה לתת הארכה בכדי לבצע ניסיון להעלות לענן חלופי, אשמח מאד לממש.**
