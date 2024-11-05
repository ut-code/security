use w::{Request, Response};
use worker as w;

#[w::event(fetch)]
pub async fn main(req: Request, env: w::Env, ctx: w::worker::Context) -> w::Result<w::Response> {
    let path = req.path();
    match &path {
        "/hello" => Response::ok("World!"),
    }
    Response::error(&format!("path {} is not found", path), 400)
}
