// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use serde::Serialize;
use sqlx::{Sqlite, SqlitePool};
use dotenv;
use std::env;
use chrono::{NaiveDate, Datelike};


fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![retrieve_all_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

async fn obtain_db_connection() -> sqlx::Result<sqlx::Pool<Sqlite>> {
    dotenv::dotenv().expect("Failed to read .env file");
    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");  // TODO: 240501 失敗ケースをフロントエンドに通知する。(lily.db が非存在など)
    Ok(SqlitePool::connect(&db_url).await?)
}

#[derive(Debug)]
struct SummaryTask {
    todo_id: i64,
    main_class: Option<String>,
    sub_class: Option<String>,
    start_date: Option<i64>,
    end_date: Option<i64>,
    content: Option<String>,
}

#[derive(Serialize)]
struct SummaryTaskForFront {
    todo_id: i64,
    main_class: Option<String>,
    sub_class: Option<String>,
    start_date: Option<i64>,
    start_date_: Option<String>,
    end_date: Option<i64>,
    end_date_: Option<String>,
    content: Option<String>,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn retrieve_all_data() -> Vec<SummaryTaskForFront> {
    let db_conn = obtain_db_connection().await.unwrap();
    let mut temp_result = sqlx::query_as!(SummaryTask, "SELECT * FROM summary")
        .fetch_all(&db_conn)
        .await.unwrap();

    temp_result.sort_by(|i, j| {
        i.main_class.cmp(&j.main_class)
            .then_with(|| i.sub_class.cmp(&j.sub_class))
            .then_with(|| i.start_date.cmp(&j.start_date))
            .then_with(|| i.end_date.cmp(&j.end_date))
            .then_with(|| i.todo_id.cmp(&j.todo_id))
    });
    
    let mut result = vec![];
    for dat in temp_result {
        let start_date_;
        if let Some(start_date) = dat.start_date {
            start_date_ = Some(excel_serial_to_date(start_date));
        } else {
            start_date_ = None;
        }

        let end_date_;
        if let Some(end_date) = dat.end_date {
            end_date_ = Some(excel_serial_to_date(end_date));
        } else {
            end_date_ = None;
        }

        result.push(SummaryTaskForFront {
            todo_id: dat.todo_id,
            main_class: dat.main_class,
            sub_class: dat.sub_class,
            start_date: dat.start_date,
            end_date: dat.end_date,
            content: dat.content,
            start_date_,
            end_date_,
        });
    }
    result
}

fn excel_serial_to_date(serial_value: i64) -> String {
    let excel_start_date: NaiveDate = NaiveDate::from_ymd_opt(1899, 12, 30).unwrap();
    let temp_result = excel_start_date + chrono::Duration::days(serial_value.into());
    format!("{}/{:02}/{:02}", temp_result.year(), temp_result.month(), temp_result.day())
}

#[cfg(test)]
mod tests {
    #[test]
    fn test_excel_serial_to_date() {
        use crate::excel_serial_to_date;
        let result = excel_serial_to_date(45414);
        let expected = String::from("2024/05/02");
        assert_eq!(result, expected);
    }
}