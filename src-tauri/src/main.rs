// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use serde::Serialize;
use sqlx::{Sqlite, SqlitePool};
use dotenv;
use std::env;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

async fn obtain_db_connection() -> sqlx::Result<sqlx::Pool<Sqlite>> {
    dotenv::dotenv().expect("Failed to read .env file");
    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");  // TODO: 240501 失敗ケースをフロントエンドに通知する。(lily.db が非存在など)
    Ok(SqlitePool::connect(&db_url).await?)
}

#[derive(Serialize)]
struct SummaryTask {
    todo_id: i64,
    main_class: Option<String>,
    sub_class: Option<String>,
    start_date: Option<i64>,
    end_date: Option<i64>,
    content: Option<String>,
}

#[tauri::command]
async fn retrieve_all_data() -> Vec<SummaryTask> {
    let db_conn = obtain_db_connection().await.unwrap();
    sqlx::query_as!(SummaryTask, "SELECT * FROM summary")
        .fetch_all(&db_conn)
        .await.unwrap()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, retrieve_all_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
