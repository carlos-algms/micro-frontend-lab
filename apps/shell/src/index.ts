/**
 * This “bootstrapping” gives Webpack the opportunity to process the rest of the imports
 * before executing the app and will avoid potential race conditions on importing all the code.
 *
 * This is the main entry point whose job is to asynchronously load the main application.
 *
 * It is a safety measure for now, but would be crucial if we were loading federated modules
 * in the application.tsx file.
 */
import('./application');
