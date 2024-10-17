import 'dotenv/config';
import {drizzle} from 'drizzle-orm/node-postgres';
import {
    User,
    Story,
    Chapter,
    Conversation,
    Character,
    Message,
    Comment,
    PointOfView,
    Purchase,
    UserReadChapter
} from './schema';
import {v4 as uuidv4} from 'uuid';
import {characters, conversations} from "../../drizzle/schema"; // Utilisé pour générer des UUID

// Initialisation de la base de données
const db = drizzle(process.env.DATABASE_URL!);

type User = typeof User.$inferInsert;

async function main() {
    // Création d'utilisateurs
    const user1: User = {
        id: uuidv4(),
        username: 'JohnDoe',
        email: 'john.doe@example.com',
        password: 'securepassword',
        createdAt: new Date(),
        updatedAt: new Date(),
        age: 19
    };

    const user2: User = {
        id: uuidv4(),
        username: 'JaneDoe',
        email: 'jane.doe@example.com',
        password: 'anotherpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
        age: 15
    };

    await db.insert(User).values([user1, user2]);
    console.log('Users created!');

    // Création d'une histoire
    const story: typeof Story.$inferInsert = {
        id: uuidv4(),
        title: 'Une histoire intrigante',
        authorId: user1.id ?? '',
        isDraft: false,
        likes: 10,
        views: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    await db.insert(Story).values(story);
    console.log('Story created!');

    // Création de chapitres
    const chapter1: typeof Chapter.$inferInsert = {
        id: uuidv4(),
        storyId: story.id ?? '',
        title: 'Chapitre 1 : Le début',
        isDraft: false,
        releaseDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const chapter2: typeof Chapter.$inferInsert = {
        id: uuidv4(),
        storyId: story.id ?? '',
        title: 'Chapitre 2 : Le mystère s\'épaissit',
        isDraft: false,
        releaseDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    await db.insert(Chapter).values([chapter1, chapter2]);
    console.log('Chapters created!');


    // conversation
    const conversation1: typeof Conversation.$inferInsert = {
        id: uuidv4(),
        title: 'Une conversation',
        storyId: story.id ?? '',
        chapterId: chapter1.id ?? '',
    };

    await db.insert(Conversation).values([conversation1]);

    const characters1: typeof Character.$inferInsert = {
        id: uuidv4(),
        name: 'JohnDoe',
        description: '',
        storyId: story.id ?? '',
    }
    await db.insert(Character).values([characters1]);

    // Création de messages
    const message1: typeof Message.$inferInsert = {
        conversationId: conversation1.id ?? '',
        senderId: characters1.id ?? '',
        id: uuidv4(),
        chapterId: chapter1.id ?? '',
        content: 'C\'est le début de quelque chose...',
        timestamp: new Date()
    };

    const message2: typeof Message.$inferInsert = {
        conversationId: conversation1.id ?? '',
        senderId: characters1.id ?? '',
        id: uuidv4(),
        chapterId: chapter1.id ?? '',

        content: 'Je suis prête pour la suite !',
        timestamp: new Date()
    };

    await db.insert(Message).values([message1, message2]);
    console.log('Messages created!');

    // Création de commentaires
    const comment1: typeof Comment.$inferInsert = {
        id: uuidv4(),
        storyId: story.id ?? '',
        userId: user2.id ?? '',
        content: 'J\'adore cette histoire, vivement la suite !',
        createdAt: new Date(),
    };

    await db.insert(Comment).values(comment1);
    console.log('Comments created!');

    // Création de points de vue
    const pov1: typeof PointOfView.$inferInsert = {
        characterId: characters1.id ?? '',
        id: uuidv4(),
        chapterId: chapter1.id ?? ''

    };

    const pov2: typeof PointOfView.$inferInsert = {
        id: uuidv4(),
        chapterId: chapter2.id ?? '',
        characterId: characters1.id ?? ''
    };

    await db.insert(PointOfView).values([pov1, pov2]);
    console.log('Points of View created!');

    // Simuler un achat de chapitres
    const purchase: typeof Purchase.$inferInsert = {
        id: uuidv4(),
        userId: user1.id ?? '',
        storyId: story.id ?? '',
        purchasedAt: new Date(),
    };

    await db.insert(Purchase).values(purchase);
    console.log('Purchase recorded!');

    // Suivi des chapitres lus
    const userReadChapter: typeof UserReadChapter.$inferInsert = {
        userId: user1.id ?? '',
        chapterId: chapter1.id ?? '',
        readAt: new Date(),
    };

    await db.insert(UserReadChapter).values(userReadChapter);
    console.log('User read chapter recorded!');
}

// Exécuter la fonction principale
main().catch((err) => {
    console.error('Error during seeding:', err);
});
